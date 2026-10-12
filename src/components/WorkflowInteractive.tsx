import { useState, type FC } from 'react';
import { ArrowRight, Bot, CheckCircle, GitMerge, Laptop, MessageSquare, Sparkles, TrendingUp, Zap } from 'lucide-react';

export const WorkflowInteractive: FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: '1. Captação & Contato',
      subtitle: 'Entrada multicanal',
      icon: MessageSquare,
      summary: 'O cliente envia mensagem pelo WhatsApp corporativo ou preenche formulário no site.',
      detail: {
        channel: 'WhatsApp Business API + Webhook',
        speed: 'Instantâneo (< 200ms)',
        event: 'Novo lead identificado: "Diretor de Operações buscando automação"',
        log: 'Gatilho [inbound_lead_received] disparado com sucesso',
      },
    },
    {
      id: 1,
      title: '2. Qualificação por IA',
      subtitle: 'METRYS AI em ação',
      icon: Bot,
      summary: 'O agente de IA realiza a sondagem de perfil, orçamento e urgência de forma natural e precisa.',
      detail: {
        channel: 'Metrys AI Core Engine',
        speed: '1.2s tempo de resposta',
        event: 'Score de qualificação: 94/100 (Lead Quente: 60 colaboradores)',
        log: 'Intenção de compra confirmada sem intervenção humana',
      },
    },
    {
      id: 2,
      title: '3. Gestão no CRM',
      subtitle: 'METRYS CRM centralizado',
      icon: TrendingUp,
      summary: 'O lead é cadastrado automaticamente no funil comercial com histórico completo gravado.',
      detail: {
        channel: 'Metrys CRM Pipeline',
        speed: 'Sincronização em tempo real',
        event: 'Atribuído para Executivo Comercial Sênior + Alerta instantâneo',
        log: 'Reunião de apresentação agendada diretamente na agenda',
      },
    },
    {
      id: 3,
      title: '4. Integração Contínua',
      subtitle: 'METRYS AUTOMAÇÕES orquestrador',
      icon: GitMerge,
      summary: 'Após a aprovação da proposta, o módulo de Automações aciona o ERP para emitir contrato e gerar credenciais.',
      detail: {
        channel: 'Metrys Automações & Processos',
        speed: 'Automação em segundo plano',
        event: 'Contrato enviado para assinatura digital + NF gerada',
        log: 'Zero digitação manual e conciliação bancária sincronizada',
      },
    },
    {
      id: 4,
      title: '5. Inteligência & Sistemas',
      subtitle: 'METRYS SOB MEDIDA',
      icon: Laptop,
      summary: 'Diretoria acompanha métricas de receita, LTV e produtividade em dashboards executivos sob medida.',
      detail: {
        channel: 'Metrys Sob Medida Architecture',
        speed: 'Atualização contínua',
        event: 'Dashboard de BI e métricas gerenciais em tempo real',
        log: 'Previsão de fechamento e auditoria permanente',
      },
    },
  ];

  const current = steps[activeStep];

  return (
    <section className="py-24 relative bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-xs font-mono font-bold text-[#0A1128] uppercase tracking-widest shadow-card">
            <Zap className="w-3.5 h-3.5 text-[#EAB308]" />
            Fluxo Operacional de Ponta a Ponta
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A1128] tracking-tight">
            Como a Tecnologia <span className="text-[#2A4365]">METRYS</span> Conecta sua Operação
          </h2>

          <p className="text-base text-[#52667D]">
            Veja a esteira de execução completa: desde o primeiro segundo em que o lead entra até o fechamento contratual automatizado.
          </p>
        </div>

        {/* Step Selector Horizontal Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {steps.map((st) => {
            const Icon = st.icon;
            const isSelected = activeStep === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStep(st.id)}
                className={`p-4 rounded-xl text-left transition-all duration-200 border ${
                  isSelected
                    ? 'bg-white border-[#0A1128] shadow-md -translate-y-0.5'
                    : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? 'bg-[#0A1128] text-white'
                        : 'bg-[#F1F5F9] text-[#2A4365]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[#52667D] uppercase font-bold">
                    Passo 0{st.id + 1}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-black text-[#0A1128] line-clamp-1">
                  {st.title}
                </div>
                <div className="text-[11px] text-[#52667D] line-clamp-1 mt-0.5">
                  {st.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Inspector Box */}
        <div className="rounded-2xl bg-white p-8 border border-[#CBD5E1] shadow-card grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0A1128] uppercase bg-[#F1F5F9] px-3 py-1 rounded-md border border-[#CBD5E1]">
              <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
              {current.subtitle}
            </div>

            <h3 className="text-2xl font-black text-[#0A1128]">
              {current.title}
            </h3>

            <p className="text-base text-[#52667D] leading-relaxed">
              {current.summary}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#0A1128] hover:bg-[#1E2E4A] px-5 py-3 rounded-xl transition-all shadow-sm"
              >
                <span>Avançar para o Próximo Passo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Event Inspector Box */}
          <div className="md:col-span-5 bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] font-mono text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <span className="text-[#0A1128] font-bold uppercase tracking-wider text-[11px]">
                TELEMETRIA DO FLUXO
              </span>
              <span className="text-emerald-700 font-bold text-[10px] bg-emerald-100 px-2 py-0.5 rounded">
                OPERACIONAL
              </span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div>
                <span className="text-[#52667D]">Canal / Camada: </span>
                <span className="text-[#0A1128] font-bold">{current.detail.channel}</span>
              </div>
              <div>
                <span className="text-[#52667D]">Velocidade: </span>
                <span className="text-[#2A4365] font-bold">{current.detail.speed}</span>
              </div>
              <div>
                <span className="text-[#52667D]">Acontecimento: </span>
                <span className="text-[#334155] block mt-0.5">{current.detail.event}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0] text-[10px] text-emerald-700 flex items-start gap-1.5 font-bold">
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>{current.detail.log}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
