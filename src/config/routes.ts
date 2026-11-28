import { ENTITY_CONFIG } from './entity';

export interface RouteSpecification {
  label: string;
  value: string;
}

export interface RouteIntegrationGroup {
  category: string;
  items: string[];
  detail: string;
}

export interface RouteCoverage {
  title: string;
  summary: string;
  points: string[];
}

export interface RouteComparison {
  caption: string;
  columns: [string, string, string];
  rows: Array<{
    criterio: string;
    tradicional: string;
    metrys: string;
  }>;
}

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  h1: string;
  badge: string;
  answerFirst: string;
  datePublished: string;
  dateModified: string;
  pillarKey?: 'crm' | 'ai' | 'flow' | 'systems';
  solutionName?: string;
  schemaType: 'SoftwareApplication' | 'Service';
  breadcrumbs: Array<{ name: string; url: string }>;
  features: Array<{ title: string; desc: string }>;
  especificacoes?: RouteSpecification[];
  integracoes?: RouteIntegrationGroup[];
  coberturaBrasil?: RouteCoverage;
  comparativo?: RouteComparison;
  sla: string;
}

export const ROUTES: Record<string, RouteMeta> = {
  '/': {
    path: '/',
    title: 'METRYS | CRM B2B, IA WhatsApp/Voz, Automações e Software',
    description:
      'Ecossistema corporativo com inteligência artificial: CRM B2B, Agentes de IA, Automações e Software Sob Medida para acelerar a produtividade da sua empresa.',
    canonical: `${ENTITY_CONFIG.domain}/`,
    h1: 'CRM B2B, Agentes de IA para WhatsApp e Voz, Automações e Software Sob Medida.',
    badge: 'ECOSSISTEMA CORPORATIVO COM IA',
    answerFirst:
      'A METRYS é uma empresa de tecnologia B2B especializada em inteligência artificial corporativa, CRM para gestão comercial, automação de processos e desenvolvimento de software personalizado. Nossas soluções se integram à infraestrutura e aos ERPs já utilizados por médias e grandes empresas, eliminando retrabalho operacional com implantação assistida e segurança de dados em conformidade com a LGPD.',
    datePublished: '2026-11-28',
    dateModified: '2026-11-28',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [{ name: 'Início', url: `${ENTITY_CONFIG.domain}/` }],
    features: [
      {
        title: 'CRM B2B Especializado',
        desc: 'Pipeline visual Kanban integrado com WhatsApp corporativo e previsibilidade comercial.',
      },
      {
        title: 'Agentes de IA Corporativos',
        desc: 'Atendimento e qualificação contínua 24/7 com resposta em menos de 2 segundos.',
      },
      {
        title: 'Automações & Integrações ERP',
        desc: 'Conexão nativa com Bling, Omie, Totvs, SAP e RD Station sem intervenção manual.',
      },
      {
        title: 'Software Sob Medida',
        desc: 'Sistemas corporativos robustos desenvolvidos por sprints com governança técnica.',
      },
    ],
    sla: ENTITY_CONFIG.slas.crmOnboarding,
  },
  '/solucoes/crm-b2b': {
    path: '/solucoes/crm-b2b',
    title: 'CRM B2B com Inteligência Artificial | METRYS Tecnologia',
    description:
      'Gestão comercial B2B integrada ao WhatsApp e funil Kanban. Previsibilidade de receita, histórico centralizado e follow-up ágil para vendas corporativas.',
    canonical: `${ENTITY_CONFIG.domain}/solucoes/crm-b2b`,
    h1: 'CRM B2B com Inteligência Artificial para Gestão Comercial e Previsibilidade',
    badge: 'MÓDULO COMERCIAL & FUNIL INTELIGENTE',
    pillarKey: 'crm',
    solutionName: 'METRYS CRM B2B',
    answerFirst:
      'O METRYS CRM B2B é uma plataforma de gestão comercial desenhada para times de vendas consultivas e corporativas. A solução centraliza o pipeline em visão Kanban, registra todo o histórico de conversas e propostas diretamente no WhatsApp e automatiza lembretes de follow-up, evitando a perda de negócios e garantindo previsibilidade de faturamento para a diretoria comercial.',
    datePublished: '2026-11-28',
    dateModified: '2026-11-28',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Início', url: `${ENTITY_CONFIG.domain}/` },
      { name: 'CRM B2B', url: `${ENTITY_CONFIG.domain}/solucoes/crm-b2b` },
    ],
    features: [
      {
        title: 'Pipeline Kanban em Tempo Real',
        desc: 'Visão clara de etapas, gargalos e propostas em negociação.',
      },
      {
        title: 'Integração Nativa com WhatsApp',
        desc: 'Histórico de atendimento e propostas unificado sem planilhas paralelas.',
      },
      {
        title: 'Automação de Follow-up Comercial',
        desc: 'Lembretes programados para manter contato ativo com todos os leads qualificados.',
      },
      {
        title: 'Previsibilidade e Relatórios',
        desc: 'Métricas de conversão por consultor, tempo de ciclo e projeção de receita.',
      },
    ],
    especificacoes: [
      { label: 'Arquitetura', value: 'Cloud Multi-Tenant com isolamento estrito por empresa (RBAC)' },
      { label: 'Segurança & LGPD', value: 'Criptografia AES-256 em repouso, TLS 1.3 em trânsito e logs auditáveis' },
      { label: 'Disponibilidade & SLA', value: 'Implantação assistida entre 5 e 15 dias úteis com migração guiada' },
      { label: 'Modelo de Deploy', value: 'SaaS Corporativo Dedicado ou conectado à VPC / banco da contratante' },
    ],
    integracoes: [
      {
        category: 'Canais de Atendimento',
        items: ['WhatsApp Business API', 'E-mail Corporativo (SMTP/IMAP)', 'Formulários Web'],
        detail: 'Captura direta de leads com atribuição de origem (UTMs, landing page e referrer).',
      },
      {
        category: 'ERPs & Financeiro',
        items: ['Bling', 'Omie', 'TOTVS', 'SAP'],
        detail: 'Sincronização de cadastros, pedidos aprovados e emissão de propostas sem redigitação.',
      },
      {
        category: 'Automação & Webhooks',
        items: ['API REST METRYS', 'Webhooks Bidirecionais', 'n8n / Make'],
        detail: 'Gatilhos automáticos por mudança de etapa no funil Kanban.',
      },
    ],
    coberturaBrasil: {
      title: 'Atendimento em Todo o Brasil',
      summary:
        'Implantação remota assistida para empresas de médio e grande porte em todos os estados brasileiros, com fuso horário e regras fiscais locais.',
      points: [
        'Onboarding remoto guiado para times comerciais presenciais ou distribuídos',
        'Parametrização de funis B2B, Inside Sales e Field Sales sem interrupção da operação',
        'Suporte direto com especialistas e gerente de conta em português',
      ],
    },
    comparativo: {
      caption: 'Comparativo operacional entre gestão comercial em planilhas e o METRYS CRM B2B',
      columns: ['Critério Operacional', 'Planilhas e Controles Manuais', 'METRYS CRM B2B'],
      rows: [
        {
          criterio: 'Visibilidade do Pipeline',
          tradicional: 'Arquivos desatualizados e visões isoladas por vendedor',
          metrys: 'Kanban centralizado em tempo real com histórico por conta',
        },
        {
          criterio: 'Registro de WhatsApp',
          tradicional: 'Conversas dispersas em aparelhos pessoais sem rastreio',
          metrys: 'Histórico vinculado ao card do cliente e à equipe comercial',
        },
        {
          criterio: 'Follow-up de Propostas',
          tradicional: 'Depende de memória individual ou anotações manuais',
          metrys: 'Lembretes e fluxos programados por etapa do funil',
        },
        {
          criterio: 'Prazo de Implantação',
          tradicional: 'Semanas ajustando planilhas sem governança de acesso',
          metrys: '5 a 15 dias úteis com onboarding assistido por especialistas',
        },
      ],
    },
    sla: ENTITY_CONFIG.slas.crmOnboarding,
  },
  '/solucoes/agentes-ia-whatsapp-voz': {
    path: '/solucoes/agentes-ia-whatsapp-voz',
    title: 'Agentes de IA para WhatsApp e Voz | METRYS Tecnologia',
    description:
      'Agentes de IA 24/7 para WhatsApp corporativo e voz. Triagem rápida, qualificação de leads e integração a troncos SIP homologados no Brasil.',
    canonical: `${ENTITY_CONFIG.domain}/solucoes/agentes-ia-whatsapp-voz`,
    h1: 'Agentes de IA para WhatsApp Corporativo e Atendimento por Voz',
    badge: 'ATENDIMENTO & QUALIFICAÇÃO COM IA',
    pillarKey: 'ai',
    solutionName: 'METRYS Agentes de IA',
    answerFirst:
      'Os Agentes de IA da METRYS executam atendimento imediato, triagem técnica e qualificação comercial 24/7 no WhatsApp e telefone. Em voz, a METRYS entrega a camada de software e IA conversacional integrada a operadoras e troncos SIP parceiros homologados pela Anatel no Brasil, com latência média inferior a 2 segundos e agendamento automático.',
    datePublished: '2026-11-28',
    dateModified: '2026-11-28',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Início', url: `${ENTITY_CONFIG.domain}/` },
      { name: 'Agentes de IA', url: `${ENTITY_CONFIG.domain}/solucoes/agentes-ia-whatsapp-voz` },
    ],
    features: [
      {
        title: 'Atendimento Imediato (< 2s)',
        desc: 'Recepção cordial e triagem automática sem filas de espera.',
      },
      {
        title: 'Qualificação Baseada em Critérios',
        desc: 'Identificação do perfil de compra antes do direcionamento ao consultor humano.',
      },
      {
        title: 'Conformidade Regulatória de Voz',
        desc: 'Camada de software conectada a troncos SIP e operadoras parceiras homologadas pela Anatel.',
      },
      {
        title: 'Segurança e Dados Isolados',
        desc: 'Modelos parametrizados com isolamento estrito sem treinamento com dados de terceiros.',
      },
    ],
    especificacoes: [
      { label: 'Arquitetura', value: 'Orquestração RAG corporativa com base de conhecimento proprietária e guardrails' },
      { label: 'Segurança & LGPD', value: 'Zero treinamento público; criptografia AES-256/TLS 1.3 e trilha de auditoria' },
      { label: 'Latência & SLA', value: 'Tempo médio de primeira resposta inferior a 2s; implantação em 5 a 15 dias úteis' },
      { label: 'Camada de Voz', value: 'Software de IA conversacional integrado via SIP/WebRTC a operadoras homologadas pela Anatel' },
    ],
    integracoes: [
      {
        category: 'Mensageria & Voz',
        items: ['WhatsApp Business API', 'Troncos SIP Homologados Anatel', 'Chat Web Corporativo'],
        detail: 'Atendimento omnichannel com transição fluida para consultores humanos no mesmo histórico.',
      },
      {
        category: 'CRM & Agendas',
        items: ['METRYS CRM', 'HubSpot', 'Pipedrive', 'Google Calendar / Microsoft 365'],
        detail: 'Qualificação gravada direto no funil com agendamento automático de reuniões.',
      },
      {
        category: 'Catálogos & ERP',
        items: ['Tabelas de Preço', 'Base Técnica PDF/SQL', 'Bling / Omie / TOTVS'],
        detail: 'Consulta em tempo real de disponibilidade, regras comerciais e status de pedidos.',
      },
    ],
    coberturaBrasil: {
      title: 'Atendimento em Todo o Brasil',
      summary:
        'Operação nacional 24/7 com adaptação de linguagem corporativa em português brasileiro e conexão a operadoras SIP licenciadas em qualquer DDD.',
      points: [
        'Atendimento e parametrização 100% remotos para empresas em todo o Brasil',
        'Compatível com números WhatsApp Business oficiais e linhas SIP corporativas',
        'Transbordo inteligente para equipes comerciais regionais conforme critérios do lead',
      ],
    },
    comparativo: {
      caption: 'Comparativo entre atendimento manual convencional e Agentes de IA METRYS',
      columns: ['Critério de Atendimento', 'Atendimento Manual / URA Rígida', 'METRYS Agentes de IA'],
      rows: [
        {
          criterio: 'Disponibilidade',
          tradicional: 'Restrita ao horário comercial da equipe',
          metrys: 'Contínua 24 horas por dia, 7 dias por semana',
        },
        {
          criterio: 'Tempo de Primeira Resposta',
          tradicional: 'Filas de espera ou retorno apenas no dia útil seguinte',
          metrys: 'Inferior a 2 segundos com triagem contextualizada',
        },
        {
          criterio: 'Qualificação e Transbordo',
          tradicional: 'Menus numéricos rígidos e perguntas repetidas ao humano',
          metrys: 'Linguagem natural com envio do resumo qualificado ao CRM',
        },
        {
          criterio: 'Operação de Voz',
          tradicional: 'URA estática sem compreensão de contexto',
          metrys: 'IA conversacional conectada a troncos SIP parceiros homologados',
        },
      ],
    },
    sla: ENTITY_CONFIG.slas.aiAgentsOnboarding,
  },
  '/solucoes/automacoes-integracoes-erp': {
    path: '/solucoes/automacoes-integracoes-erp',
    title: 'Automações e Integrações com ERP | METRYS Tecnologia',
    description:
      'Conecte WhatsApp, CRM e sistemas de gestão (Bling, Omie, Totvs, SAP). Automação de faturamento, emissão de notas e conciliação bancária sem erro manual.',
    canonical: `${ENTITY_CONFIG.domain}/solucoes/automacoes-integracoes-erp`,
    h1: 'Automações Corporativas e Integrações Seguras com ERPs',
    badge: 'INTEGRAÇÃO DE SISTEMAS & WORKFLOWS',
    pillarKey: 'flow',
    solutionName: 'METRYS Automações & Integrações',
    answerFirst:
      'O módulo METRYS Automações conecta sistemas isolados, unificando canais de mensagens, plataformas comerciais e ERPs consolidados como Bling, Omie, Totvs, SAP e RD Station. Elimina a digitação manual de pedidos, automatiza a emissão de notas fiscais e propostas comerciais e executa conciliações financeiras em segundo plano com monitoramento proativo de erros.',
    datePublished: '2026-11-28',
    dateModified: '2026-11-28',
    schemaType: 'Service',
    breadcrumbs: [
      { name: 'Início', url: `${ENTITY_CONFIG.domain}/` },
      { name: 'Automações & ERP', url: `${ENTITY_CONFIG.domain}/solucoes/automacoes-integracoes-erp` },
    ],
    features: [
      {
        title: 'Sincronização Bidirecional com ERP',
        desc: 'Conectores homologados com os principais ERPs do mercado brasileiro.',
      },
      {
        title: 'Emissão Fiscal e Faturamento Automático',
        desc: 'Geração de notas fiscais e contratos assim que o negócio avança no funil.',
      },
      {
        title: 'Eliminação de Retrabalho Manual',
        desc: 'Redução drástica de tempo de operação e digitação de dados redundantes.',
      },
      {
        title: 'Alertas e Recuperação de Falhas',
        desc: 'Logs auditáveis e reenvio automático em caso de instabilidade upstream.',
      },
    ],
    especificacoes: [
      { label: 'Arquitetura', value: 'Orquestração orientada a eventos, filas idempotentes e webhooks com retry automático' },
      { label: 'Segurança & LGPD', value: 'Tokens assinados, criptografia TLS 1.3/AES-256 e segregação por tenant' },
      { label: 'Monitoramento & SLA', value: 'Logs auditáveis de payload e implantação padrão entre 5 e 15 dias úteis' },
      { label: 'Modelo de Deploy', value: 'Workers em nuvem gerenciada ou integrados à rede privada da empresa' },
    ],
    integracoes: [
      {
        category: 'ERPs & Backoffice',
        items: ['Bling', 'Omie', 'TOTVS (Protheus/RM)', 'SAP Business One'],
        detail: 'Leitura e escrita bidirecional de clientes, pedidos, faturamento e estoque.',
      },
      {
        category: 'Marketing & Vendas',
        items: ['METRYS CRM', 'RD Station', 'HubSpot', 'Pipedrive'],
        detail: 'Sincronização automática de oportunidades ganhas para emissão contratual.',
      },
      {
        category: 'Financeiro & Conectores',
        items: ['Gateways de Pagamento', 'Bancos via API/OFX', 'n8n / Make / APIs REST'],
        detail: 'Conciliação e disparo de cobranças e notas fiscais sem conferência manual.',
      },
    ],
    coberturaBrasil: {
      title: 'Atendimento em Todo o Brasil',
      summary:
        'Integração remota de ERPs, emissores fiscais e workflows corporativos para empresas em qualquer estado do Brasil sem parada operacional.',
      points: [
        'Mapeamento técnico remoto junto à controladoria e TI da empresa',
        'Testes em ambiente de homologação antes da entrada em produção',
        'Suporte contínuo para evolução de conectores e regras fiscais brasileiras',
      ],
    },
    comparativo: {
      caption: 'Comparativo entre digitação manual entre sistemas e METRYS Automações & ERP',
      columns: ['Processo Operacional', 'Digitação Manual / Exportação CSV', 'METRYS Automações & ERP'],
      rows: [
        {
          criterio: 'Passagem Venda → Faturamento',
          tradicional: 'Operador copia dados do WhatsApp/CRM para o ERP manualmente',
          metrys: 'Sincronização automática via webhook ao fechar negócio',
        },
        {
          criterio: 'Tratamento de Falhas',
          tradicional: 'Erros silenciosos percebidos apenas no fechamento mensal',
          metrys: 'Fila com retry automático e alerta imediato de inconsistência',
        },
        {
          criterio: 'Rastreabilidade e Auditoria',
          tradicional: 'Sem registro confiável de quem alterou ou enviou cada dado',
          metrys: 'Logs detalhados por transação e idempotência garantida',
        },
        {
          criterio: 'Prazo de Implantação',
          tradicional: 'Meses de filas internas ou dependências isoladas',
          metrys: '5 a 15 dias úteis para integrações e fluxos padrão',
        },
      ],
    },
    sla: ENTITY_CONFIG.slas.automationsOnboarding,
  },
  '/solucoes/software-sob-medida': {
    path: '/solucoes/software-sob-medida',
    title: 'Software Sob Medida e Sistemas Web | METRYS Tecnologia',
    description:
      'Desenvolvimento de software corporativo sob medida. Arquitetura em nuvem, segurança de dados e entregas por sprints com MVP a partir de 30 a 45 dias úteis.',
    canonical: `${ENTITY_CONFIG.domain}/solucoes/software-sob-medida`,
    h1: 'Desenvolvimento de Software Sob Medida e Sistemas Corporativos',
    badge: 'ENGENHARIA DE SOFTWARE & SISTEMAS WEB',
    pillarKey: 'systems',
    solutionName: 'METRYS Software Sob Medida',
    answerFirst:
      'O Software Sob Medida da METRYS desenvolve plataformas digitais, portais B2B e sistemas corporativos moldados às regras da sua operação. A engenharia aplica criptografia AES-256 e TLS 1.3, controle de acessos RBAC, código documentado com propriedade do cliente e entregas por sprints ágeis, com MVP estruturado a partir de 30 a 45 dias úteis.',
    datePublished: '2026-11-28',
    dateModified: '2026-11-28',
    schemaType: 'Service',
    breadcrumbs: [
      { name: 'Início', url: `${ENTITY_CONFIG.domain}/` },
      { name: 'Software Sob Medida', url: `${ENTITY_CONFIG.domain}/solucoes/software-sob-medida` },
    ],
    features: [
      {
        title: 'Arquitetura Moderna e Escalável',
        desc: 'Desenvolvimento em nuvem preparado para alta disponibilidade e crescimento de carga.',
      },
      {
        title: 'Entregas Ágeis por Sprints',
        desc: 'Validação contínua com MVP planejado a partir de 30 a 45 dias úteis.',
      },
      {
        title: 'Código Proprietário e Documentado',
        desc: 'Propriedade intelectual plena do cliente com documentação técnica e padrões de segurança.',
      },
      {
        title: 'Blindagem de Segurança e LGPD',
        desc: 'Controle de acesso por permissões (RBAC) e auditoria de operações.',
      },
    ],
    especificacoes: [
      { label: 'Arquitetura', value: 'React, TypeScript, Node.js / Next.js, PostgreSQL e APIs REST/GraphQL documentadas' },
      { label: 'Segurança & LGPD', value: 'RBAC granular, criptografia AES-256/TLS 1.3, validação server-side e trilha de auditoria' },
      { label: 'Modelo de Entrega', value: 'Sprints semanais/quinzenais com MVP a partir de 30 a 45 dias úteis conforme escopo' },
      { label: 'Propriedade & Deploy', value: 'Código-fonte 100% da contratante em nuvem AWS, Vercel, Azure ou infra dedicada' },
    ],
    integracoes: [
      {
        category: 'Sistemas Legados & ERPs',
        items: ['APIs Proprietárias', 'SAP / TOTVS / Omie / Bling', 'Bancos SQL/PostgreSQL'],
        detail: 'Camadas de integração seguras sem exigir substituição imediata do legado.',
      },
      {
        category: 'Identidade & Governança',
        items: ['SSO / OAuth2', 'Controle RBAC Multi-Perfil', 'Logs de Auditoria'],
        detail: 'Gestão corporativa de acessos para equipes internas, parceiros e clientes finais.',
      },
      {
        category: 'Pagamentos & Mensageria',
        items: ['Gateways Financeiros', 'WhatsApp Business API', 'Webhooks Transacionais'],
        detail: 'Automação de cobranças, notificações e fluxos de aprovação dentro do sistema.',
      },
    ],
    coberturaBrasil: {
      title: 'Atendimento em Todo o Brasil',
      summary:
        'Squads de engenharia e arquitetura de software atuando de forma remota e integrada com lideranças de TI e negócios em todo o Brasil.',
      points: [
        'Discovery arquitetural remoto com levantamento de requisitos e prototipação',
        'Demonstrações quinzenais em ambiente de homologação com acompanhamento da diretoria',
        'Documentação técnica completa e handover estruturado para operação contínua',
      ],
    },
    comparativo: {
      caption: 'Comparativo entre ferramentas genéricas de prateleira e Software Sob Medida METRYS',
      columns: ['Critério Técnico', 'Ferramenta Genérica de Prateleira', 'METRYS Software Sob Medida'],
      rows: [
        {
          criterio: 'Aderência às Regras de Negócio',
          tradicional: 'Empresa precisa adaptar seus processos às limitações do SaaS',
          metrys: 'Sistema modelado exatamente conforme a operação e fluxos reais',
        },
        {
          criterio: 'Propriedade e Evolução',
          tradicional: 'Dependência de roadmap e reajustes de licença de terceiros',
          metrys: 'Código-fonte proprietário da empresa e evolução sob demanda',
        },
        {
          criterio: 'Integração com Ecossistema',
          tradicional: 'Conectores limitados e custos extras por usuário/automação',
          metrys: 'APIs dedicadas conectadas diretamente aos ERPs e bancos da empresa',
        },
        {
          criterio: 'Cronograma de Entrega',
          tradicional: 'Personalizações travadas por falta de flexibilidade do fornecedor',
          metrys: 'Sprints transparentes com MVP a partir de 30 a 45 dias úteis',
        },
      ],
    },
    sla: ENTITY_CONFIG.slas.customSoftwareMvp,
  },
};
