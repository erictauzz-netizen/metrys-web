export interface EntityConfig {
  name: string;
  legalName: string;
  domain: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: {
    country: string;
    locality: string;
  };
  socials: string[];
  gaMeasurementId: string;
  slas: {
    crmOnboarding: string;
    aiAgentsOnboarding: string;
    automationsOnboarding: string;
    customSoftwareMvp: string;
    voiceCompliance: string;
  };
}

export const ENTITY_CONFIG: EntityConfig = {
  name: 'METRYS',
  legalName: 'METRYS Tecnologia',
  domain: 'https://metrys.com.br',
  tagline: 'Tecnologia que Move Negócios',
  description:
    'Ecossistema corporativo com inteligência artificial: CRM B2B, Agentes de IA, Automações e Sistemas Sob Medida para acelerar a produtividade da sua empresa.',
  email: 'comercial@metrys.com.br',
  phone: '', // Placeholder comercial oficial
  address: {
    country: 'BR',
    locality: 'Brasil',
  },
  socials: [], // Em conformidade com Google 2026: sameAs vazio até os perfis estarem indexados
  gaMeasurementId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GA_MEASUREMENT_ID) || '',
  slas: {
    crmOnboarding: '5 a 15 dias úteis',
    aiAgentsOnboarding: '5 a 15 dias úteis',
    automationsOnboarding: '5 a 15 dias úteis',
    customSoftwareMvp: 'A partir de 30 a 45 dias úteis (sprints ágeis)',
    voiceCompliance:
      'Camada de software e IA conversacional integrada a operadoras e troncos SIP homologados no Brasil',
  },
};
