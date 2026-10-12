function normalizePhoneBR(raw) {
  if (typeof raw !== 'string' || !raw.trim()) return null;
  const digits = raw.replace(/\D/g, '');
  if (raw.trim().startsWith('+')) {
    return /^\d{8,15}$/.test(digits) ? `+${digits}` : null;
  }
  if (digits.length === 12 || digits.length === 13) {
    return digits.startsWith('55') ? `+${digits}` : null;
  }
  if (digits.length === 10) {
    const ddd = digits.slice(0, 2);
    const num = digits.slice(2);
    const first = num[0];
    if (['6', '7', '8', '9'].includes(first)) {
      return `+55${ddd}9${num}`;
    }
    return `+55${digits}`;
  }
  if (digits.length === 11) {
    return `+55${digits}`;
  }
  return digits ? `+55${digits}` : null;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const webhookToken = process.env.METRYS_WEBHOOK_TOKEN || 'metrys-site-institucional-oficial';

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'CRM integration credentials not configured' });
  }

  const headers = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };

  try {
    let body = req.body;
    if (typeof body === 'string') {
      const contentType = req.headers['content-type'] || '';
      if (contentType.includes('application/x-www-form-urlencoded')) {
        body = Object.fromEntries(new URLSearchParams(body));
      } else {
        try {
          body = JSON.parse(body);
        } catch {
          body = Object.fromEntries(new URLSearchParams(body));
        }
      }
    } else if (!body || typeof body !== 'object') {
      body = {};
    }

    const rawName = String(body.nome || body.name || '').trim();
    const rawPhone = String(body.telefone || body.phone || body.whatsapp || '').trim();
    const rawEmail = String(body.email || '').trim().toLowerCase() || null;
    const rawEmpresa = String(body.empresa || body.company || '').trim();
    const rawMensagem = String(body.mensagem || body.notes || '').trim();

    if (!rawName && !rawPhone && !rawEmail) {
      return res.status(400).json({ error: 'Nome ou telefone obrigatório' });
    }

    const phoneE164 = normalizePhoneBR(rawPhone);

    // 1. Buscar a fonte de captação (webhook_sources)
    const srcRes = await fetch(
      `${supabaseUrl}/rest/v1/webhook_sources?path_token=eq.${encodeURIComponent(webhookToken)}&is_active=eq.true&select=*`,
      { headers }
    );
    const sources = await srcRes.json();
    const source = Array.isArray(sources) && sources.length > 0 ? sources[0] : null;

    if (!source) {
      return res.status(404).json({ error: 'Fonte de captação ativa não encontrada no METRYS CRM' });
    }

    const orgId = source.organization_id;
    const pipelineId = source.default_pipeline_id;
    const stageId = source.default_stage_id;

    // 2. Resolver ou criar o contato em `contacts`
    let contactId = null;
    if (phoneE164) {
      const findContactRes = await fetch(
        `${supabaseUrl}/rest/v1/contacts?organization_id=eq.${orgId}&phone_number=eq.${encodeURIComponent(phoneE164)}&is_merged_into=is.null&select=id,name&limit=1`,
        { headers }
      );
      const foundContacts = await findContactRes.json();
      if (Array.isArray(foundContacts) && foundContacts.length > 0) {
        contactId = foundContacts[0].id;
      } else {
        const createContactRes = await fetch(`${supabaseUrl}/rest/v1/contacts`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            organization_id: orgId,
            name: rawName || phoneE164,
            phone_number: phoneE164,
            email: rawEmail,
            source: 'webhook',
            source_metadata: { webhook_source_id: source.id },
          }),
        });
        const createdContacts = await createContactRes.json();
        if (Array.isArray(createdContacts) && createdContacts.length > 0) {
          contactId = createdContacts[0].id;
        }
      }
    }

    // 3. Montar custom_fields e utm
    const customFields = {};
    if (rawEmpresa) customFields.empresa = rawEmpresa;
    if (rawMensagem) customFields.mensagem = rawMensagem;

    const utm = {};
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      if (body[k]) utm[k] = String(body[k]);
    }

    const leadTitle = rawEmpresa
      ? `${rawName || 'Lead'} — ${rawEmpresa}`
      : rawName || phoneE164 || rawEmail || 'Lead Site METRYS';

    // 4. Criar o lead em `crm_leads`
    const createLeadRes = await fetch(`${supabaseUrl}/rest/v1/crm_leads`, {
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
        source_metadata: { ...utm, webhook_source_id: source.id },
        custom_fields: customFields,
        tags: ['Site METRYS'],
      }),
    });

    if (!createLeadRes.ok) {
      const errText = await createLeadRes.text();
      return res.status(500).json({ error: 'Erro ao criar lead no CRM', details: errText });
    }

    const createdLeads = await createLeadRes.json();
    const lead = Array.isArray(createdLeads) && createdLeads.length > 0 ? createdLeads[0] : null;

    // 5. Registrar captação em `webhook_lead_captures` e atualizar `last_received_at`
    await Promise.all([
      fetch(`${supabaseUrl}/rest/v1/webhook_lead_captures`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          organization_id: orgId,
          webhook_source_id: source.id,
          source_name: source.name || 'Site Institucional METRYS',
          lead_id: lead ? lead.id : null,
          contact_id: contactId,
          outcome: 'criado',
          captured_name: rawName || null,
          captured_phone: phoneE164 || rawPhone || null,
          captured_email: rawEmail,
          fields: customFields,
          utm,
          user_agent: (req.headers['user-agent'] || '').slice(0, 500) || null,
          origin: (req.headers['origin'] || req.headers['referer'] || '').slice(0, 500) || null,
        }),
      }),
      fetch(`${supabaseUrl}/rest/v1/webhook_sources?id=eq.${source.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          last_received_at: new Date().toISOString(),
        }),
      }),
    ]);

    return res.status(200).json({ data: { lead_id: lead ? lead.id : null } });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno na integração com o CRM', message: err.message });
  }
}
