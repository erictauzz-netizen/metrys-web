import { randomUUID, timingSafeEqual } from 'node:crypto';

export const maxDuration = 25;

const DEFAULT_WEBHOOK_TOKEN = 'metrys-site-institucional-oficial';
const REQUEST_TIMEOUT_MS = 6000;
const TELEMETRY_TIMEOUT_MS = 4000;
const RETRY_DELAYS_MS = [250, 750];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RETRYABLE_ERROR_MESSAGE =
  'Serviço temporariamente indisponível. Seus dados foram preservados localmente para reenvio automático.';

class CrmRequestError extends Error {
  constructor(message, { code, status = 503, retryable = true } = {}) {
    super(message);
    this.name = 'CrmRequestError';
    this.code = code || 'upstream_error';
    this.status = status;
    this.retryable = retryable;
  }
}

function normalizePhoneBR(raw) {
  if (typeof raw !== 'string' || !raw.trim()) return null;
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, '');
  let normalized = null;

  if (trimmed.startsWith('+')) {
    normalized = /^\d{8,15}$/.test(digits) ? `+${digits}` : null;
  } else if (digits.length === 12 || digits.length === 13) {
    normalized = digits.startsWith('55') ? `+${digits}` : null;
  } else if (digits.length === 10) {
    const ddd = digits.slice(0, 2);
    const num = digits.slice(2);
    const first = num[0];
    if (['6', '7', '8', '9'].includes(first)) {
      normalized = `+55${ddd}9${num}`;
    } else {
      normalized = `+55${digits}`;
    }
  } else if (digits.length === 11) {
    normalized = `+55${digits}`;
  }

  return normalized && /^\+\d{8,15}$/.test(normalized) ? normalized : null;
}

function getHeader(req, name) {
  const raw = req?.headers?.[name.toLowerCase()];
  if (Array.isArray(raw)) return raw[0];
  return typeof raw === 'string' ? raw : undefined;
}

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || !a || !b) return false;
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function parseBody(req) {
  let body = req.body;
  if (Buffer.isBuffer(body)) {
    body = body.toString('utf8');
  }
  if (typeof body === 'string') {
    const contentType = String(getHeader(req, 'content-type') || '');
    if (contentType.includes('application/x-www-form-urlencoded')) {
      return Object.fromEntries(new URLSearchParams(body));
    }
    try {
      const parsed = JSON.parse(body);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return Object.fromEntries(new URLSearchParams(body));
    }
  }
  if (!body || typeof body !== 'object') {
    return {};
  }
  return body;
}

function classifyNetworkException(err) {
  const name = err?.name || '';
  const message = String(err?.message || '');
  const causeCode = String(err?.cause?.code || err?.code || '');

  if (
    name === 'TimeoutError' ||
    name === 'AbortError' ||
    causeCode === 'UND_ERR_CONNECT_TIMEOUT' ||
    causeCode === 'ETIMEDOUT' ||
    /timeout|aborted/i.test(message)
  ) {
    return 'timeout';
  }

  if (
    ['ENOTFOUND', 'EAI_AGAIN', 'EAI_FAIL'].includes(causeCode) ||
    /ENOTFOUND|getaddrinfo/i.test(message)
  ) {
    return 'dns_error';
  }

  return 'network_error';
}

function isRetryableStatus(status) {
  return status === 429 || status >= 500;
}

function classifyHttpFailure(status) {
  if (status === 401 || status === 403) {
    return new CrmRequestError(RETRYABLE_ERROR_MESSAGE, {
      code: 'auth_error',
      status: 503,
      retryable: true,
    });
  }
  if (status === 429) {
    return new CrmRequestError(RETRYABLE_ERROR_MESSAGE, {
      code: 'rate_limited',
      status: 503,
      retryable: true,
    });
  }
  if (status >= 500) {
    return new CrmRequestError(RETRYABLE_ERROR_MESSAGE, {
      code: 'upstream_5xx',
      status: 503,
      retryable: true,
    });
  }
  return new CrmRequestError('Dados inválidos ou rejeitados pelo CRM', {
    code: 'upstream_4xx',
    status: 400,
    retryable: false,
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  return fetch(url, {
    ...options,
    signal: AbortSignal.timeout(timeoutMs),
  });
}

async function fetchWithRetry(url, options = {}, { maxAttempts = 3, timeoutMs = REQUEST_TIMEOUT_MS } = {}) {
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetchWithTimeout(url, options, timeoutMs);
      if (isRetryableStatus(res.status) && attempt < maxAttempts) {
        const delayMs = RETRY_DELAYS_MS[attempt - 1] ?? RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - 1];
        await sleep(delayMs);
        continue;
      }
      return res;
    } catch (err) {
      lastError = err;
      const code = classifyNetworkException(err);
      if (attempt < maxAttempts) {
        const delayMs = RETRY_DELAYS_MS[attempt - 1] ?? RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - 1];
        await sleep(delayMs);
        continue;
      }
      throw new CrmRequestError(RETRYABLE_ERROR_MESSAGE, {
        code,
        status: 503,
        retryable: true,
      });
    }
  }

  throw new CrmRequestError(RETRYABLE_ERROR_MESSAGE, {
    code: classifyNetworkException(lastError),
    status: 503,
    retryable: true,
  });
}

async function parseJsonOrThrow(res, fallbackCode = 'upstream_5xx') {
  try {
    return await res.json();
  } catch {
    throw new CrmRequestError(RETRYABLE_ERROR_MESSAGE, {
      code: fallbackCode,
      status: 503,
      retryable: true,
    });
  }
}

async function findContactByPhone(supabaseUrl, headers, orgId, phoneE164) {
  const res = await fetchWithRetry(
    `${supabaseUrl}/rest/v1/contacts?organization_id=eq.${encodeURIComponent(orgId)}&phone_number=eq.${encodeURIComponent(phoneE164)}&is_merged_into=is.null&select=id,name&limit=1`,
    { method: 'GET', headers }
  );
  if (!res.ok) {
    throw classifyHttpFailure(res.status);
  }
  const rows = await parseJsonOrThrow(res);
  return Array.isArray(rows) && rows.length > 0 ? rows[0].id : null;
}

async function findContactByEmail(supabaseUrl, headers, orgId, email) {
  const res = await fetchWithRetry(
    `${supabaseUrl}/rest/v1/contacts?organization_id=eq.${encodeURIComponent(orgId)}&email_normalized=eq.${encodeURIComponent(email)}&is_merged_into=is.null&select=id,name&limit=1`,
    { method: 'GET', headers }
  );
  if (!res.ok) {
    throw classifyHttpFailure(res.status);
  }
  const rows = await parseJsonOrThrow(res);
  return Array.isArray(rows) && rows.length > 0 ? rows[0].id : null;
}

async function resolveOrCreateContact({ supabaseUrl, headers, orgId, sourceId, rawName, phoneE164, rawEmail }) {
  if (phoneE164) {
    const existingByPhone = await findContactByPhone(supabaseUrl, headers, orgId, phoneE164);
    if (existingByPhone) return existingByPhone;

    const createRes = await fetchWithRetry(`${supabaseUrl}/rest/v1/contacts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        organization_id: orgId,
        name: rawName || phoneE164,
        phone_number: phoneE164,
        email: rawEmail,
        source: 'webhook',
        source_metadata: { webhook_source_id: sourceId },
      }),
    });

    if (createRes.status === 409) {
      const conflictPhoneId = await findContactByPhone(supabaseUrl, headers, orgId, phoneE164);
      if (conflictPhoneId) return conflictPhoneId;
      if (rawEmail) {
        const conflictEmailId = await findContactByEmail(supabaseUrl, headers, orgId, rawEmail);
        if (conflictEmailId) return conflictEmailId;
      }
      throw new CrmRequestError(RETRYABLE_ERROR_MESSAGE, {
        code: 'contact_conflict',
        status: 503,
        retryable: true,
      });
    }

    if (!createRes.ok) {
      throw classifyHttpFailure(createRes.status);
    }

    const created = await parseJsonOrThrow(createRes);
    if (Array.isArray(created) && created.length > 0 && created[0].id) {
      return created[0].id;
    }

    if (rawEmail) {
      return await findContactByEmail(supabaseUrl, headers, orgId, rawEmail);
    }
    return null;
  }

  if (rawEmail) {
    const existingByEmail = await findContactByEmail(supabaseUrl, headers, orgId, rawEmail);
    if (existingByEmail) return existingByEmail;

    const createRes = await fetchWithRetry(`${supabaseUrl}/rest/v1/contacts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        organization_id: orgId,
        name: rawName || rawEmail,
        phone_number: null,
        email: rawEmail,
        source: 'webhook',
        source_metadata: { webhook_source_id: sourceId },
      }),
    });

    if (createRes.status === 409) {
      const conflictEmailId = await findContactByEmail(supabaseUrl, headers, orgId, rawEmail);
      if (conflictEmailId) return conflictEmailId;
      throw new CrmRequestError(RETRYABLE_ERROR_MESSAGE, {
        code: 'contact_conflict',
        status: 503,
        retryable: true,
      });
    }

    if (!createRes.ok) {
      throw classifyHttpFailure(createRes.status);
    }

    const created = await parseJsonOrThrow(createRes);
    return Array.isArray(created) && created.length > 0 ? created[0].id : null;
  }

  return null;
}

const ALLOWED_ORIGINS = [
  'https://metrys.com.br',
  'https://www.metrys.com.br',
  'http://localhost:3000',
  'http://localhost:3003',
  'http://localhost:5173',
];

function isOriginAllowed(origin) {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  return /^https:\/\/metrys-web(-[a-z0-9-]+)?\.vercel\.app$/.test(origin);
}

export default async function handler(req, res) {
  const rawOrigin = getHeader(req, 'origin');
  const origin = typeof rawOrigin === 'string' ? rawOrigin.trim() : '';
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', 'https://metrys.com.br');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', retryable: false, code: 'method_not_allowed' });
  }

  if (origin && !isOriginAllowed(origin)) {
    return res.status(403).json({
      error: 'Origin not allowed',
      retryable: false,
      code: 'forbidden_origin',
    });
  }

  try {
    const body = parseBody(req);

    // Proteção Anti-Spam (Honeypot)
    const honeypot = body.website_url_confirm || body._gotcha || body.honeypot;
    if (typeof honeypot === 'string' && honeypot.trim() !== '') {
      return res.status(200).json({
        data: {
          lead_id: 'bot_discarded',
          mode: 'discarded',
        },
      });
    }

    const rawName = String(body.nome || body.name || '').trim();
    const rawPhone = String(body.telefone || body.phone || body.whatsapp || '').trim();
    const rawEmail = String(body.email || '').trim().toLowerCase() || null;
    const rawEmpresa = String(body.empresa || body.company || '').trim();
    const rawMensagem = String(body.mensagem || body.notes || '').trim();
    const landingPage = typeof body.landing_page === 'string' ? body.landing_page.trim().slice(0, 500) : null;
    const initialReferrer = typeof body.initial_referrer === 'string' ? body.initial_referrer.trim().slice(0, 500) : null;
    const pillarInterest = typeof body.pillar_interest === 'string' ? body.pillar_interest.trim().slice(0, 100) : null;
    const externalId =
      typeof body.external_id === 'string' && body.external_id.trim()
        ? body.external_id.trim().slice(0, 255)
        : randomUUID();

    if (!rawName && !rawPhone && !rawEmail) {
      return res.status(400).json({
        error: 'Nome ou telefone obrigatório',
        retryable: false,
        code: 'validation_error',
      });
    }

    if (rawEmail && !EMAIL_REGEX.test(rawEmail)) {
      return res.status(400).json({
        error: 'E-mail inválido',
        retryable: false,
        code: 'invalid_email',
      });
    }

    const faultInject = getHeader(req, 'x-metrys-fault-inject');
    const diagnosticSecret = getHeader(req, 'x-metrys-diagnostic-secret');
    const configuredHealthSecret = (process.env.HEALTH_CHECK_SECRET || '').trim();

    if (faultInject === 'primary-down' && safeEqual(diagnosticSecret, configuredHealthSecret)) {
      return res.status(503).json({
        error: RETRYABLE_ERROR_MESSAGE,
        retryable: true,
        code: 'simulated_primary_outage',
        fault_injected: true,
      });
    }

    const utm = {};
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      if (body[k]) utm[k] = String(body[k]);
    }

    const crmWebhookUrl = (process.env.METRYS_CRM_WEBHOOK_URL || '').trim();
    if (crmWebhookUrl) {
      const forwardPayload = {
        ...(rawName ? { nome: rawName } : {}),
        ...(rawPhone ? { telefone: rawPhone } : {}),
        ...(rawEmail ? { email: rawEmail } : {}),
        ...(rawEmpresa ? { empresa: rawEmpresa } : {}),
        mensagem: [
          rawMensagem,
          pillarInterest ? `[Interesse: ${pillarInterest}]` : null,
          landingPage ? `[Página: ${landingPage}]` : null,
          initialReferrer && initialReferrer !== 'direto' ? `[Referrer: ${initialReferrer}]` : null,
        ]
          .filter(Boolean)
          .join(' | '),
        external_id: externalId,
        ...(landingPage ? { landing_page: landingPage } : {}),
        ...(initialReferrer ? { initial_referrer: initialReferrer } : {}),
        ...(pillarInterest ? { pillar_interest: pillarInterest } : {}),
        ...utm,
      };

      const webhookRes = await fetchWithRetry(crmWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(forwardPayload),
      });

      if (!webhookRes.ok) {
        throw classifyHttpFailure(webhookRes.status);
      }

      const webhookJson = await parseJsonOrThrow(webhookRes);
      const forwardedLeadId = webhookJson?.data?.lead_id;
      if (!forwardedLeadId) {
        throw new CrmRequestError(RETRYABLE_ERROR_MESSAGE, {
          code: 'upstream_error',
          status: 503,
          retryable: true,
        });
      }

      return res.status(200).json({
        data: {
          lead_id: forwardedLeadId,
          mode: 'primary',
        },
      });
    }

    const supabaseUrl = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '');
    const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
    const webhookToken = (process.env.METRYS_WEBHOOK_TOKEN || '').trim() || DEFAULT_WEBHOOK_TOKEN;

    if (!supabaseUrl || !serviceRoleKey) {
      return res.status(503).json({
        error: RETRYABLE_ERROR_MESSAGE,
        retryable: true,
        code: 'missing_env',
      });
    }

    const headers = {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    };

    const phoneE164 = normalizePhoneBR(rawPhone);

    // 1. Buscar a fonte de captação ativa (webhook_sources)
    const srcRes = await fetchWithRetry(
      `${supabaseUrl}/rest/v1/webhook_sources?path_token=eq.${encodeURIComponent(webhookToken)}&is_active=eq.true&select=*`,
      { method: 'GET', headers }
    );

    if (!srcRes.ok) {
      throw classifyHttpFailure(srcRes.status);
    }

    const sources = await parseJsonOrThrow(srcRes);
    const source = Array.isArray(sources) && sources.length > 0 ? sources[0] : null;

    if (!source) {
      return res.status(503).json({
        error: RETRYABLE_ERROR_MESSAGE,
        retryable: true,
        code: 'missing_active_source',
      });
    }

    const orgId = source.organization_id;
    const pipelineId = source.default_pipeline_id;
    const stageId = source.default_stage_id;

    // 2. Resolver ou criar contato em `contacts` (por telefone E.164 ou fallback por e-mail)
    const contactId = await resolveOrCreateContact({
      supabaseUrl,
      headers,
      orgId,
      sourceId: source.id,
      rawName,
      phoneE164,
      rawEmail,
    });

    // 3. Montar payload do lead
    const customFields = {};
    if (rawEmpresa) customFields.empresa = rawEmpresa;
    if (rawMensagem) customFields.mensagem = rawMensagem;
    if (landingPage) customFields.landing_page = landingPage;
    if (initialReferrer) customFields.initial_referrer = initialReferrer;
    if (pillarInterest) customFields.pillar_interest = pillarInterest;

    const sourceMetadata = {
      ...utm,
      webhook_source_id: source.id,
      ...(landingPage ? { landing_page: landingPage } : {}),
      ...(initialReferrer ? { initial_referrer: initialReferrer } : {}),
      ...(pillarInterest ? { pillar_interest: pillarInterest } : {}),
      ...(rawPhone && !phoneE164 ? { raw_phone: rawPhone } : {}),
    };

    const leadTitle = rawEmpresa
      ? `${rawName || 'Lead'} — ${rawEmpresa}`
      : rawName || phoneE164 || rawEmail || 'Lead Site METRYS';

    // 4. Criar o lead em `crm_leads` com idempotência por external_id
    const createLeadRes = await fetchWithRetry(`${supabaseUrl}/rest/v1/crm_leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        organization_id: orgId,
        pipeline_id: pipelineId,
        stage_id: stageId,
        contact_id: contactId,
        title: leadTitle,
        description: rawMensagem || null,
        status: 'open',
        position_in_stage: 1000,
        currency: 'BRL',
        source: 'webhook',
        external_id: externalId,
        source_metadata: sourceMetadata,
        custom_fields: customFields,
        tags: ['Site METRYS'],
      }),
    });

    let lead = null;
    if (createLeadRes.status === 409) {
      const existingLeadRes = await fetchWithRetry(
        `${supabaseUrl}/rest/v1/crm_leads?organization_id=eq.${encodeURIComponent(orgId)}&source=eq.webhook&external_id=eq.${encodeURIComponent(externalId)}&select=id&limit=1`,
        { method: 'GET', headers }
      );
      if (!existingLeadRes.ok) {
        throw classifyHttpFailure(existingLeadRes.status);
      }
      const existingLeads = await parseJsonOrThrow(existingLeadRes);
      lead = Array.isArray(existingLeads) && existingLeads.length > 0 ? existingLeads[0] : null;
    } else if (!createLeadRes.ok) {
      throw classifyHttpFailure(createLeadRes.status);
    } else {
      const createdLeads = await parseJsonOrThrow(createLeadRes);
      lead = Array.isArray(createdLeads) && createdLeads.length > 0 ? createdLeads[0] : null;
    }

    if (!lead?.id) {
      throw new CrmRequestError(RETRYABLE_ERROR_MESSAGE, {
        code: 'upstream_5xx',
        status: 503,
        retryable: true,
      });
    }

    // 5. Telemetria não-bloqueante em `webhook_lead_captures` e `webhook_sources.last_received_at`
    const telemetryResults = await Promise.allSettled([
      fetchWithTimeout(
        `${supabaseUrl}/rest/v1/webhook_lead_captures`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            organization_id: orgId,
            webhook_source_id: source.id,
            source_name: source.name || 'Site Institucional METRYS',
            lead_id: lead.id,
            contact_id: contactId,
            outcome: 'criado',
            captured_name: rawName || null,
            captured_phone: phoneE164 || rawPhone || null,
            captured_email: rawEmail,
            fields: customFields,
            utm,
            user_agent: String(getHeader(req, 'user-agent') || '').slice(0, 500) || null,
            origin:
              String(getHeader(req, 'origin') || getHeader(req, 'referer') || '').slice(0, 500) ||
              null,
          }),
        },
        TELEMETRY_TIMEOUT_MS
      ),
      fetchWithTimeout(
        `${supabaseUrl}/rest/v1/webhook_sources?id=eq.${encodeURIComponent(source.id)}`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            last_received_at: new Date().toISOString(),
          }),
        },
        TELEMETRY_TIMEOUT_MS
      ),
    ]);

    for (const item of telemetryResults) {
      if (item.status === 'rejected') {
        console.warn('[api/lead] Secondary telemetry failed:', item.reason?.message || 'rejected');
      } else if (!item.value.ok) {
        console.warn('[api/lead] Secondary telemetry HTTP warning:', item.value.status);
      }
    }

    // 6. Sincronização direta com o Funil de Vendas Kanban (novo-crm-vercel)
    try {
      const crmWebhookUrl = process.env.KANBAN_CRM_WEBHOOK_URL || 'https://novo-crm-vercel.vercel.app/api/api/v1/leads';
      const utmSummary = Object.entries(utm)
        .map(([k, v]) => `${k}=${v}`)
        .join(', ');
      const attributionNotes = [
        rawMensagem ? `Mensagem do site:\n${rawMensagem}` : 'Lead capturado via formulário oficial metrys.com.br',
        pillarInterest ? `Pilar de interesse: ${pillarInterest}` : null,
        landingPage ? `Landing page: ${landingPage}` : null,
        initialReferrer ? `Referrer inicial: ${initialReferrer}` : null,
        utmSummary ? `UTMs: ${utmSummary}` : null,
      ]
        .filter(Boolean)
        .join('\n');

      const crmPayload = {
        name: rawName || phoneE164 || rawEmail || 'Novo Lead',
        phone: phoneE164 || rawPhone || undefined,
        email: rawEmail || undefined,
        company: rawEmpresa || undefined,
        title: leadTitle,
        source: 'Site METRYS',
        notes: attributionNotes,
        ...(landingPage ? { landing_page: landingPage } : {}),
        ...(initialReferrer ? { initial_referrer: initialReferrer } : {}),
        ...(pillarInterest ? { pillar_interest: pillarInterest } : {}),
        ...utm,
      };

      await fetchWithTimeout(
        crmWebhookUrl,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(crmPayload),
        },
        TELEMETRY_TIMEOUT_MS
      );
    } catch (crmSyncErr) {
      console.warn('[api/lead] Aviso sincronização Kanban CRM:', crmSyncErr.message);
    }

    return res.status(200).json({
      data: {
        lead_id: lead.id,
        mode: 'primary',
      },
    });
  } catch (err) {
    if (err instanceof CrmRequestError) {
      return res.status(err.status).json({
        error: err.message,
        retryable: err.retryable,
        code: err.code,
      });
    }

    const code = classifyNetworkException(err);
    return res.status(503).json({
      error: RETRYABLE_ERROR_MESSAGE,
      retryable: true,
      code,
    });
  }
}
