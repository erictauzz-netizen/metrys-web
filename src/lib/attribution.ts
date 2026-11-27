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
    let parsed: AttributionData = existing ? JSON.parse(existing) : null;

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
    } else if (defaultPillar && !parsed.pillar_interest) {
      parsed.pillar_interest = defaultPillar;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
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
 * Envio seguro de evento ao Google Analytics 4 (quando configurado via VITE_GA_MEASUREMENT_ID)
 */
export function sendGaEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (typeof w.gtag === 'function') {
    w.gtag('event', eventName, params);
  }
}
