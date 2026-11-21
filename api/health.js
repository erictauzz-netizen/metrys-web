export const maxDuration = 15;

const DEFAULT_WEBHOOK_TOKEN = 'metrys-site-institucional-oficial';
const HEALTH_TIMEOUT_MS = 5000;

function setCommonHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
}

function sendJson(req, res, statusCode, payload) {
  setCommonHeaders(res);
  if (req.method === 'HEAD') {
    return res.status(statusCode).end();
  }
  return res.status(statusCode).json(payload);
}

function classifyNetworkError(err) {
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

export default async function handler(req, res) {
  setCommonHeaders(res);

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ status: 'error', error: 'Method not allowed' });
  }

  const timestamp = new Date().toISOString();
  const supabaseUrl = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '');
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
  const webhookToken = (process.env.METRYS_WEBHOOK_TOKEN || '').trim() || DEFAULT_WEBHOOK_TOKEN;

  if (!supabaseUrl || !serviceRoleKey) {
    return sendJson(req, res, 503, {
      status: 'down',
      reason: 'missing_env',
      error: 'CRM credentials not configured',
      db_latency_ms: 0,
      timestamp,
    });
  }

  const startMs = Date.now();
  let upstreamRes;

  try {
    upstreamRes = await fetch(
      `${supabaseUrl}/rest/v1/webhook_sources?path_token=eq.${encodeURIComponent(webhookToken)}&is_active=eq.true&select=id,last_received_at`,
      {
        method: 'GET',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(HEALTH_TIMEOUT_MS),
      }
    );
  } catch (err) {
    const dbLatencyMs = Date.now() - startMs;
    const reason = classifyNetworkError(err);
    return sendJson(req, res, 503, {
      status: 'down',
      reason,
      error: 'Failed to reach Supabase CRM',
      db_latency_ms: dbLatencyMs,
      timestamp,
    });
  }

  const dbLatencyMs = Date.now() - startMs;

  if (upstreamRes.status === 401 || upstreamRes.status === 403) {
    return sendJson(req, res, 503, {
      status: 'down',
      reason: 'auth_error',
      error: 'Supabase authentication failed',
      db_latency_ms: dbLatencyMs,
      timestamp,
    });
  }

  if (upstreamRes.status >= 500) {
    return sendJson(req, res, 503, {
      status: 'down',
      reason: 'upstream_5xx',
      error: `Upstream HTTP ${upstreamRes.status}`,
      db_latency_ms: dbLatencyMs,
      timestamp,
    });
  }

  if (!upstreamRes.ok) {
    return sendJson(req, res, 503, {
      status: 'down',
      reason: 'upstream_error',
      error: `Upstream HTTP ${upstreamRes.status}`,
      db_latency_ms: dbLatencyMs,
      timestamp,
    });
  }

  let rows;
  try {
    rows = await upstreamRes.json();
  } catch {
    return sendJson(req, res, 503, {
      status: 'down',
      reason: 'upstream_error',
      error: 'Invalid JSON response from upstream CRM',
      db_latency_ms: dbLatencyMs,
      timestamp,
    });
  }

  if (!Array.isArray(rows) || rows.length === 0) {
    return sendJson(req, res, 503, {
      status: 'down',
      reason: 'missing_active_source',
      error: 'No active webhook source found',
      active_source: false,
      db_latency_ms: dbLatencyMs,
      timestamp,
    });
  }

  return sendJson(req, res, 200, {
    status: 'ok',
    db_latency_ms: dbLatencyMs,
    active_source: true,
    last_received_at: rows[0].last_received_at ?? null,
    timestamp,
  });
}
