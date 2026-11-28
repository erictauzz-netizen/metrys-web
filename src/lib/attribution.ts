export interface AttributionData {
  landing_page: string;
  initial_referrer: string;
  pillar_interest?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  fbclid?: string;
  gclid?: string;
}

const STORAGE_KEY = 'metrys_attribution_v1';

export function initAttribution(defaultPillar?: string): AttributionData {
  if (typeof window === 'undefined') {
    return {
      landing_page: '/',
      initial_referrer: '',
      pillar_interest: defaultPillar,
    };
  }

  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    let parsed: AttributionData | null = existing ? JSON.parse(existing) : null;

    if (!parsed) {
      const url = new URL(window.location.href);
      const params = url.searchParams;

      parsed = {
        landing_page: window.location.pathname || '/',
        initial_referrer: document.referrer || 'direto',
        pillar_interest: defaultPillar,
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_term: params.get('utm_term') || undefined,
        utm_content: params.get('utm_content') || undefined,
        fbclid: params.get('fbclid') || undefined,
        gclid: params.get('gclid') || undefined,
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    } else {
      const url = new URL(window.location.href);
      const params = url.searchParams;
      let updated = false;

      if (defaultPillar && !parsed.pillar_interest) {
        parsed.pillar_interest = defaultPillar;
        updated = true;
      }

      for (const key of [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'fbclid',
        'gclid',
      ] as const) {
        const val = params.get(key);
        if (val && !parsed[key]) {
          parsed[key] = val;
          updated = true;
        }
      }

      if (updated) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      }
    }

    return parsed;
  } catch {
    return {
      landing_page: window.location.pathname || '/',
      initial_referrer: document.referrer || 'direto',
      pillar_interest: defaultPillar,
    };
  }
}

export function updatePillarInterest(pillar: string) {
  if (typeof window === 'undefined') return;
  try {
    const current = initAttribution();
    current.pillar_interest = pillar;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Ignore storage errors
  }
}

export function getAttributionData(): AttributionData {
  return initAttribution();
}

/**
 * Inicializa Google Analytics 4 (gtag.js) quando VITE_GA_MEASUREMENT_ID estiver configurado,
 * mantendo window.dataLayer e window.gtag sempre definidos com segurança no cliente.
 */
export function initGa4(measurementId?: string) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __metrysGaInitialized?: string;
  };

  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== 'function') {
    w.gtag = (...args: unknown[]) => {
      w.dataLayer?.push(args);
    };
  }

  const cleanId = (measurementId || '').trim();
  if (!cleanId || w.__metrysGaInitialized === cleanId) return;

  w.__metrysGaInitialized = cleanId;
  w.gtag('js', new Date());
  w.gtag('config', cleanId, { send_page_view: true });

  const existingScript = document.querySelector(`script[data-ga4-id="${cleanId}"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cleanId)}`;
    script.setAttribute('data-ga4-id', cleanId);
    document.head.appendChild(script);
  }
}

/**
 * Envio seguro de evento ao Google Analytics 4 (quando configurado via VITE_GA_MEASUREMENT_ID)
 */
export function sendGaEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  if (typeof w.gtag === 'function') {
    w.gtag('event', eventName, params);
  } else if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push(['event', eventName, params]);
  }
}

/**
 * Evento dedicado de clique em botões/links de WhatsApp com contexto de página e pilar
 */
export function trackWhatsAppClick(page: string, pillar?: string) {
  const attribution = getAttributionData();
  sendGaEvent('whatsapp_click', {
    event_category: 'engagement',
    page: page || (typeof window !== 'undefined' ? window.location.pathname || '/' : '/'),
    pillar: pillar || attribution.pillar_interest || 'geral',
  });
}
