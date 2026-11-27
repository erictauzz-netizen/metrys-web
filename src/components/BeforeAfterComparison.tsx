import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle2, Clock, Users, Zap, ShieldAlert, Sparkles, ArrowRight, ArrowRightLeft } from 'lucide-react';

interface BeforeAfterComparisonProps {
  onCtaClick?: () => void;
}

export const BeforeAfterComparison: FC<BeforeAfterComparisonProps> = ({ onCtaClick }) => {
  const [viewMode, setViewMode] = useState<'split' | 'after' | 'before'>('split');

  const comparisonItems = [
    {
      title: 'Tempo de Resposta a Novos Clientes',
      icon: Clock,
      before: {
        tag: 'Demora e perda de oportunidade',
        text: 'O lead entra no WhatsApp às 18h e só recebe retorno no dia seguinte. Mais de 40% já fecharam com a concorrência.',
        metric: '4 a 14 horas de espera',
      },
      after: {
        tag: 'Atendimento instantâneo e cordial',
        text: 'Agente Metrys AI qualifica o lead em segundos, responde dúvidas técnicas do catálogo e já agenda com o consultor certo.',
        metric: '< 2s de resposta imediata 24/7',
      },
    },
    {
      title: 'Acompanhamento do Funil Comercial',
      icon: Users,
      before: {
        tag: 'Planilhas desatualizadas e esquecimento',
        text: 'Vendedores esquecem o follow-up de propostas em aberto. A diretoria opera às cegas, sem previsão confiável de faturamento.',
        metric: 'Mais de 35% dos leads abandonados',
      },
      after: {
        tag: 'Previsibilidade e follow-up automático',
        text: 'Metrys CRM dispara lembretes inteligentes, pontua clientes por propensão de compra e mantém o funil 100% atualizado.',
        metric: '100% de follow-up em propostas ativas',
      },
    },
    {
      title: 'Rotinas Operacionais e ERP',
      icon: Zap,
      before: {
        tag: 'Digitação manual repetitiva',
        text: 'Colaboradores perdem horas copiando dados entre WhatsApp, planilhas e o ERP para faturar pedidos e conciliar notas.',
        metric: 'Cerca de 14h/semana em retrabalho',
      },
      after: {
        tag: 'Integração contínua sem esforço manual',
        text: 'Metrys Automações orquestra vendas, faturamento, emissão fiscal e conciliação bancária sem erro humano.',
        metric: '120h operacionais economizadas/mês',
      },
    },
    {
      title: 'A Rotina e o Bem-Estar da sua Equipe',
      icon: ShieldAlert,
      before: {
        tag: 'Sobrecarga e estresse diário',
        text: 'Profissionais seniores e vendedores passam o dia apagando incêndios operacionais em vez de negociar e fechar vendas.',
        metric: 'Sensação constante de sobrecarga',
      },
      after: {
        tag: 'Foco no cliente e nas negociações',
        text: 'A IA assume o trabalho repetitivo para que seus colaboradores se dediquem a construir relacionamento e bater metas.',
        metric: 'Equipe valorizada e com alto rendimento',
      },
    },
  ];

  return (
    <section className="py-24 relative bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-display font-bold text-[#1E2E4A] uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#2A4365]" />
            Impacto no Dia a Dia da Empresa
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A1128] tracking-tight">
            Como a sua Empresa Opera Hoje vs.{' '}
            <span className="text-[#2A4365]">Com a Metrys</span>
          </h2>

          <p className="text-base text-[#52667D]">
            Não se trata apenas de algoritmos. Trata-se de dar fôlego para sua equipe comercial e operacional trabalhar com tranquilidade, velocidade e precisão.
          </p>

          {/* View Mode Toggle Controls */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#F1F5F9] border border-[#CBD5E1] shadow-inner mt-6">
            <button
              onClick={() => setViewMode('split')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'split'
                  ? 'bg-[#0A1128] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0A1128]'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5" />
                Lado a Lado
              </span>
            </button>
            <button
              onClick={() => setViewMode('after')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'after'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0A1128]'
              }`}
            >
              Com a METRYS
            </button>
            <button
              onClick={() => setViewMode('before')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'before'
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0A1128]'
              }`}
            >
              Sem a METRYS
            </button>
          </div>
        </div>

        {/* Dynamic Comparison Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <AnimatePresence mode="wait">
            {comparisonItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={`${item.title}-${viewMode}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="p-6 sm:p-7 rounded-2xl border border-[#CBD5E1] bg-white shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between text-left"
                >
                  {/* Card Title & Icon */}
                  <div className="flex items-center gap-3 pb-4 border-b border-[#F1F5F9] mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center text-[#0A1128]">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-[#0A1128] tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Body Comparison Area */}
                  {viewMode === 'split' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Left: O Cenário Manual */}
                      <div className="bg-rose-50/50 p-4 sm:p-4.5 rounded-xl border border-rose-200/80 flex flex-col justify-between space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold">
                            <XCircle className="w-4 h-4 flex-shrink-0" />
                            <span>Sem a METRYS</span>
                          </div>
                          <p className="text-xs text-[#64748B] leading-relaxed">
                            {item.before.text}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-rose-200/60 text-[11px] font-bold text-rose-800">
                          Perda: {item.before.metric}
                        </div>
                      </div>

                      {/* Right: A Transformação Metrys */}
                      <div className="bg-emerald-50/50 p-4 sm:p-4.5 rounded-xl border border-emerald-200/80 flex flex-col justify-between space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                            <span>Com a METRYS</span>
                          </div>
                          <p className="text-xs text-[#334155] leading-relaxed">
                            {item.after.text}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-emerald-200/60 text-[11px] font-bold text-emerald-800">
                          Ganho: {item.after.metric}
                        </div>
                      </div>
                    </div>
                  ) : viewMode === 'after' ? (
                    <div className="bg-emerald-50/40 p-5 rounded-xl border border-emerald-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-md">
                          {item.after.tag}
                        </span>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <p className="text-sm text-[#334155] leading-relaxed">
                        {item.after.text}
                      </p>
                      <div className="pt-3 border-t border-emerald-200 text-xs font-bold text-emerald-900 flex items-center justify-between">
                        <span>Resultado Alcançado:</span>
                        <span>{item.after.metric}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-rose-50/40 p-5 rounded-xl border border-rose-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-block text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-md">
                          {item.before.tag}
                        </span>
                        <XCircle className="w-5 h-5 text-rose-500" />
                      </div>
                      <p className="text-sm text-[#64748B] leading-relaxed">
                        {item.before.text}
                      </p>
                      <div className="pt-3 border-t border-rose-200 text-xs font-bold text-rose-900 flex items-center justify-between">
                        <span>Gargalo Observado:</span>
                        <span>{item.before.metric}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Human Touch Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] shadow-card flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="text-lg font-black text-[#0A1128]">
              Pronto para migrar sua empresa para uma operação inteligente?
            </h3>
            <p className="text-xs sm:text-sm text-[#52667D]">
              Nossa equipe faz todo o trabalho pesado de parametrização técnica, integração com seus ERPs e treinamento direto dos seus colaboradores.
            </p>
          </div>
          <button
            onClick={onCtaClick}
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0A1128] hover:bg-[#1E2E4A] transition-all shadow-md active:scale-95"
          >
            <span>Ver na Prática</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
