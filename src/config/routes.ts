import { ENTITY_CONFIG } from './entity';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  h1: string;
  badge: string;
  answerFirst: string;
  pillarKey?: 'crm' | 'ai' | 'flow' | 'systems';
  solutionName?: string;
  schemaType: 'SoftwareApplication' | 'Service';
  breadcrumbs: Array<{ name: string; url: string }>;
  features: Array<{ title: string; desc: string }>;
  sla: string;
}

export const ROUTES: Record<string, RouteMeta> = {
  '/': {
    path: '/',
    title: 'METRYS | Tecnologia que Move Negócios — Sistemas e IA B2B',
    description:
      'Ecossistema corporativo com inteligência artificial: CRM B2B, Agentes de IA, Automações e Software Sob Medida para acelerar a produtividade da sua empresa.',
    canonical: `${ENTITY_CONFIG.domain}/`,
    h1: 'Sua empresa opera melhor quando a tecnologia trabalha por você.',
    badge: 'ECOSSISTEMA CORPORATIVO COM IA',
    answerFirst:
      'A METRYS é uma empresa de tecnologia B2B especializada em inteligência artificial corporativa, CRM para gestão comercial, automação de processos e desenvolvimento de software personalizado. Nossas soluções se integram à infraestrutura e aos ERPs já utilizados por médias e grandes empresas, eliminando retrabalho operacional com implantação assistida e segurança de dados em conformidade com a LGPD.',
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
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Início', url: `${ENTITY_CONFIG.domain}/` },
      { name: 'Soluções', url: `${ENTITY_CONFIG.domain}/#solucoes` },
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
        desc: 'Lembretes programados para manter contato ativo com 100% dos leads qualificados.',
      },
      {
        title: 'Previsibilidade e Relatórios',
        desc: 'Métricas de conversão por consultor, tempo de ciclo e projeção de receita.',
      },
    ],
    sla: ENTITY_CONFIG.slas.crmOnboarding,
  },
  '/solucoes/agentes-ia-whatsapp-voz': {
    path: '/solucoes/agentes-ia-whatsapp-voz',
    title: 'Agentes de IA para WhatsApp e Voz | METRYS Tecnologia',
    description:
      'Agentes inteligentes 24/7 para WhatsApp corporativo e voz. Triagem, qualificação imediata de leads e conexão a troncos SIP parceiros homologados no Brasil.',
    canonical: `${ENTITY_CONFIG.domain}/solucoes/agentes-ia-whatsapp-voz`,
    h1: 'Agentes de IA para WhatsApp Corporativo e Atendimento por Voz',
    badge: 'ATENDIMENTO & QUALIFICAÇÃO COM IA',
    pillarKey: 'ai',
    solutionName: 'METRYS Agentes de IA',
    answerFirst:
      'Os Agentes de Inteligência Artificial da METRYS realizam atendimento imediato, triagem técnica e qualificação comercial ininterrupta (24 horas por dia, 7 dias por semana). Na modalidade de voz, a METRYS fornece a camada de software e IA conversacional integrada a operadoras e troncos SIP parceiros homologados no Brasil, garantindo conformidade regulatória, latência média inferior a 2 segundos e agendamento automático com seus consultores.',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Início', url: `${ENTITY_CONFIG.domain}/` },
      { name: 'Soluções', url: `${ENTITY_CONFIG.domain}/#solucoes` },
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
        desc: 'Integração de software de voz a troncos SIP e operadoras parceiras homologadas.',
      },
      {
        title: 'Segurança e Dados Isolados',
        desc: 'Modelos parametrizados com isolamento estrito sem treinamento com dados de terceiros.',
      },
    ],
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
    schemaType: 'Service',
    breadcrumbs: [
      { name: 'Início', url: `${ENTITY_CONFIG.domain}/` },
      { name: 'Soluções', url: `${ENTITY_CONFIG.domain}/#solucoes` },
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
    sla: ENTITY_CONFIG.slas.automationsOnboarding,
  },
  '/solucoes/software-sob-medida': {
    path: '/solucoes/software-sob-medida',
    title: 'Software Sob Medida e Sistemas Web | METRYS Tecnologia',
    description:
      'Desenvolvimento de software corporativo sob medida. Arquitetura em nuvem, segurança de dados e entregas ágeis por sprints com MVP a partir de 30 a 45 dias.',
    canonical: `${ENTITY_CONFIG.domain}/solucoes/software-sob-medida`,
    h1: 'Desenvolvimento de Software Sob Medida e Sistemas Corporativos',
    badge: 'ENGENHARIA DE SOFTWARE & SISTEMAS WEB',
    pillarKey: 'systems',
    solutionName: 'METRYS Software Sob Medida',
    answerFirst:
      'O serviço de Software Sob Medida da METRYS constrói plataformas digitais, portais de clientes e sistemas de missão crítica alinhados às regras específicas da sua operação. A engenharia adota padrões de alta segurança (criptografia AES-256 e TLS 1.3), código documentado e ciclo de entrega baseado em sprints ágeis, com lançamento do MVP estruturado a partir de 30 a 45 dias úteis de acordo com o escopo acordado.',
    schemaType: 'Service',
    breadcrumbs: [
      { name: 'Início', url: `${ENTITY_CONFIG.domain}/` },
      { name: 'Soluções', url: `${ENTITY_CONFIG.domain}/#solucoes` },
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
    sla: ENTITY_CONFIG.slas.customSoftwareMvp,
  },
};
