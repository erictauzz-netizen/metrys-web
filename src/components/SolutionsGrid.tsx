import { useState, type FC } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Bot, GitFork, Code2, Check, ArrowRight, Zap, Sparkles, Layers, Users } from 'lucide-react';

interface SolutionsGridProps {
  onSelectSolution: (solutionId: string) => void;
}

export const SolutionsGrid: FC<SolutionsGridProps> = ({ onSelectSolution }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'crm' | 'ai' | 'flow' | 'systems'>('all');

  const solutions = [
    {
      id: 'crm',
      code: 'CRM',
      title: 'METRYS CRM',
      subtitle: 'Gestão comercial',
      badge: 'Vendas & Pipelines',
      userRole: 'Diretoria Comercial & Vendedores',
      image: '/images/sales-director.jpg',
      icon: BarChart3,
      tagline: 'Controle de funis, previsibilidade e follow-up automático.',
      description:
        'Substitua planilhas desconexas por uma gestão comercial inteligente. O Metrys CRM acompanha cada etapa do seu pipeline, prevê receitas com base em dados históricos e alerta sua equipe sobre os leads mais quentes antes que esfriem.',
      features: [
        'Funis visuais múltiplos para Inside Sales e Field Sales',
        'Distribuição automática de leads por critérios de pontuação',
        'Follow-up automático via WhatsApp oficial e e-mail',
        'Relatórios de conversão em tempo real e análise de ticket médio',
        'Previsão de fechamento comercial orientada por histórico',
      ],
      impact: '+42% de taxa de conversão comercial',
    },
    {
      id: 'ai',
      code: 'AI',
      title: 'METRYS AI',
      subtitle: 'Agentes inteligentes',
      badge: 'Autonomia & IA Dedicada',
      userRole: 'Equipes de Atendimento & Suporte 24/7',
      image: '/images/consultant-advisor.jpg',
      icon: Bot,
      tagline: 'Assistentes corporativos que resolvem tarefas reais 24/7.',
      description:
        'Agentes de IA treinados exclusivamente com a base de conhecimento, produtos e regras de negócio da sua empresa. Eles qualificam leads, tiram dúvidas técnicas com precisão humana e agendam reuniões sem alucinações.',
      features: [
        'Treinamento seguro em bases proprietárias (sem vazamento de dados)',
        'Integração direta com WhatsApp, Telegram e canais web',
        'Triagem autônoma de clientes de alto valor em segundos',
        'Geração automática de propostas e minutas contratuais',
        'Transição humana transparente quando a negociação exige',
      ],
      impact: 'Tempo de resposta reduzido para menos de 2s',
    },
    {
      id: 'flow',
      code: 'AUTOMAÇÕES',
      title: 'METRYS AUTOMAÇÕES',
      subtitle: 'Integração de processos e sistemas',
      badge: 'Conexão de Processos',
      userRole: 'Gestores de Operações & Controladoria',
      image: '/images/operations-flow.jpg',
      icon: GitFork,
      tagline: 'Unifique seus softwares e elimine o trabalho manual.',
      description:
        'Conecte ERPs, sistemas legados, gateways de pagamento, plataformas fiscais e CRMs. O Metrys Automações orquestra rotinas operacionais completas em segundo plano, sem necessidade de intervenção humana em tarefas repetitivas.',
      features: [
        'Disparo de webhooks e sincronização bidirecional em tempo real',
        'Automação de conciliação bancária e emissão de notas fiscais',
        'Gatilhos complexos com tratamento de falhas e reprocessamento',
        'Conexão nativa com SAP, Totvs, Bling, Omie, HubSpot e APIs REST',
        'Logs detalhados de auditoria e monitoramento de integridade',
      ],
      impact: 'Mais de 120 horas operacionais poupadas por mês',
    },
    {
      id: 'systems',
      code: 'SOB MEDIDA',
      title: 'METRYS SOB MEDIDA',
      subtitle: 'Desenvolvimento de sistemas',
      badge: 'Engenharia Sob Medida',
      userRole: 'Líderes de TI & Inovação Estratégica',
      image: '/images/tech-team.jpg',
      icon: Code2,
      tagline: 'Plataformas seguras, escaláveis e projetadas para o seu modelo.',
      description:
        'Quando soluções prontas de prateleira não atendem à especificidade do seu negócio, nossa equipe de engenharia desenvolve softwares corporativos sob medida, dashboards executivos e portais de autoatendimento escaláveis.',
      features: [
        'Arquitetura moderna em nuvem (React, Node, Next, PostgreSQL)',
        'Design Systems consistentes e interfaces de alta usabilidade',
        'Camada rígida de segurança, controle de acessos RBAC e auditoria',
        'APIs proprietárias documentadas e prontas para integração',
        'Código proprietário 100% transferido para a sua empresa',
      ],
      impact: 'Zero dependência de ferramentas limitadas de terceiros',
    },
  ];

  const filteredSolutions =
    activeTab === 'all'
      ? solutions
      : solutions.filter((sol) => sol.id === activeTab);

  return (
    <section id="solucoes" className="py-24 relative bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-display font-bold text-[#1E2E4A] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#2A4365]" />
            Soluções que Empoderam suas Equipes
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A1128] tracking-tight">
            Os 4 Pilares da Tecnologia <span className="text-[#2A4365]">METRYS</span>
          </h2>

          <p className="text-base sm:text-lg text-[#52667D] leading-relaxed">
            Cada solução foi desenhada para colocar pessoas no centro da tomada de decisão, eliminando o trabalho braçal e acelerando o faturamento do seu negócio.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-[#0A1128] text-white shadow-sm'
                : 'bg-[#F1F5F9] text-[#52667D] hover:text-[#0A1128] hover:bg-[#E2E8F0]'
            }`}
          >
            Todos os 4 Pilares
          </button>
          {solutions.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-[#0A1128] text-white shadow-sm'
                  : 'bg-[#F1F5F9] text-[#52667D] hover:text-[#0A1128] hover:bg-[#E2E8F0]'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* 4 Cards Grid with Authentic People Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {filteredSolutions.map((sol) => {
            const Icon = sol.icon;
            return (
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl bg-[#FFFFFF] overflow-hidden flex flex-col justify-between border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all duration-200 shadow-card hover:shadow-card-hover"
              >
                <div>
                  {/* Panoramic Photo of People Working in this Area */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={sol.image}
                      alt={`Equipe utilizando ${sol.title}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

                    {/* Role Tag Floating over Photo */}
                    <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] text-[11px] font-bold text-[#0A1128] shadow-sm">
                      <Users className="w-3.5 h-3.5 text-[#2A4365]" />
                      <span>{sol.userRole}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 pt-4 space-y-5">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0A1128] group-hover:bg-[#F1F5F9] transition-colors">
                          <Icon className="w-6 h-6 stroke-[1.8]" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-[#0A1128] tracking-wider uppercase font-sans">
                            {sol.title}
                          </h3>
                          <p className="text-xs font-bold text-[#52667D] uppercase tracking-widest mt-0.5">
                            {sol.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-sm font-semibold text-[#2A4365] italic border-l-2 border-[#2A4365] pl-3">
                      "{sol.tagline}"
                    </p>

                    {/* Body description */}
                    <p className="text-sm text-[#52667D] leading-relaxed">
                      {sol.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2.5 pt-3 border-t border-[#F1F5F9]">
                      <span className="text-[11px] font-bold text-[#0A1128] uppercase tracking-wider font-display">
                        Capacidades Principais:
                      </span>
                      <ul className="space-y-2">
                        {sol.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-[#334155]">
                            <Check className="w-4 h-4 text-[#0A1128] flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Metric & Action */}
                <div className="p-8 pt-0">
                  <div className="pt-6 border-t border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-2 text-xs font-display font-semibold text-[#0A1128] bg-[#F1F5F9] px-3.5 py-1.5 rounded-lg border border-[#E2E8F0]">
                      <Zap className="w-3.5 h-3.5 text-[#2A4365]" />
                      <span>{sol.impact}</span>
                    </div>

                    <button
                      onClick={() => onSelectSolution(sol.id)}
                      className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#0A1128] hover:bg-[#1E2E4A] px-4 py-2.5 rounded-lg transition-all active:scale-95 shadow-sm font-sans"
                    >
                      <span>Configurar Módulo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Synergy Banner below */}
        <div className="mt-14 rounded-2xl bg-[#F8FAFC] p-8 border border-[#E2E8F0] text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold font-display text-[#0A1128] uppercase tracking-wider">
              <Layers className="w-4 h-4 text-[#2A4365]" />
              Arquitetura Unificada de Dados
            </div>
            <h4 className="text-xl font-bold text-[#0A1128]">
              Todas as 4 soluções operam em sinergia total
            </h4>
            <p className="text-sm text-[#52667D]">
              O lead qualificado pelo <strong>Metrys AI</strong> entra diretamente no <strong>Metrys CRM</strong>, tem suas tarefas faturadas via <strong>Metrys Automações</strong> e é alimentado no seu sistema central com <strong>Metrys Sob Medida</strong>.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => onSelectSolution('all')}
              className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0A1128] hover:bg-[#1E2E4A] shadow-sm transition-all"
            >
              Falar com Arquiteto de Soluções
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
