import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle2, Clock, Users, Zap, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface BeforeAfterComparisonProps {
  onCtaClick?: () => void;
}

export const BeforeAfterComparison: FC<BeforeAfterComparisonProps> = ({ onCtaClick }) => {
  const [activeMode, setActiveMode] = useState<'after' | 'before'>('after');

  const comparisonItems = [
    {
      title: 'Tempo de Resposta a Novos Clientes',
      icon: Clock,
      before: {
        tag: 'Demora e perda de oportunidade',
        text: 'O lead entra no WhatsApp às 18h e só recebe retorno no dia seguinte. Metade já fechou com concorrentes.',
        metric: 'Média de 4 a 14 horas de espera',
      },
      after: {
        tag: 'Atendimento instantâneo e cordial',
        text: 'Agente Metrys AI atende em menos de 2 segundos, tira dúvidas técnicas do produto e já agenda com seu vendedor.',
        metric: '1.2s de resposta imediata 24/7',
      },
    },
    {
      title: 'Acompanhamento do Funil Comercial',
      icon: Users,
      before: {
        tag: 'Planilhas desatualizadas e esquecimento',
        text: 'Vendedores esquecem o follow-up de propostas abertas. A diretoria não tem previsibilidade de faturamento.',
        metric: 'Mais de 35% dos leads abandonados',
      },
      after: {
        tag: 'Previsibilidade e follow-up automático',
        text: 'Metrys CRM dispara lembretes inteligentes, pontua leads quentes e mantém o pipeline 100% atualizado.',
        metric: '+42% de conversão nas propostas',
      },
    },
    {
      title: 'Rotinas Operacionais e ERP',
      icon: Zap,
      before: {
        tag: 'Digitação manual repetitiva',
        text: 'Colaboradores passam horas copiando dados entre WhatsApp, planilhas e o ERP para faturar pedidos.',
        metric: 'Cerca de 14h/semana em retrabalho',
      },
      after: {
        tag: 'Integração contínua sem esforço manual',
        text: 'Metrys Automações conecta vendas, financeiro e emissão fiscal sem intervenção humana e com zero erro de digitação.',
        metric: '120h operacionais economizadas/mês',
      },
    },
    {
      title: 'A Rotina e o Bem-Estar da sua Equipe',
      icon: ShieldAlert,
      before: {
        tag: 'Sobrecarga e estresse operacional',
        text: 'Profissionais qualificados presos em tarefas braçais, apagando incêndios diários em vez de pensar na estratégia.',
        metric: 'Sensação constante de afogamento em tarefas',
      },
      after: {
        tag: 'Foco no cliente e nas negociações',
        text: 'A IA assume o trabalho repetitivo para que seus colaboradores se dediquem a vender e cuidar do cliente.',
        metric: 'Equipe valorizada e com alto rendimento',
      },
    },
  ];

  return (
    <section className="py-24 relative bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-display font-bold text-[#1E2E4A] uppercase tracking-wider shadow-card">
            <Sparkles className="w-3.5 h-3.5 text-[#2A4365]" />
            Impacto no Dia a Dia da Empresa
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A1128] tracking-tight">
            Como a sua Empresa Opera Hoje vs.{' '}
            <span className="text-[#2A4365]">Com a Metrys</span>
          </h2>

          <p className="text-base text-[#52667D]">
            Não se trata apenas de algoritmos. Trata-se de dar fôlego para sua equipe comercial e operacional trabalhar com tranquilidade e precisão.
          </p>

          {/* Interactive Switch */}
          <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 rounded-2xl bg-[#F1F5F9] border border-[#CBD5E1] shadow-inner mt-6 w-full sm:w-auto max-w-md">
            <button
              onClick={() => setActiveMode('before')}
              className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 text-center ${
                activeMode === 'before'
                  ? 'bg-rose-50 text-rose-700 shadow-sm border border-rose-200'
                  : 'text-[#52667D] hover:text-[#0A1128]'
              }`}
            >
              Sem a Metrys (Gargalos Manuais)
            </button>
            <button
              onClick={() => setActiveMode('after')}
              className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 text-center mt-1 sm:mt-0 ${
                activeMode === 'after'
                  ? 'bg-[#0A1128] text-white shadow-sm'
                  : 'text-[#52667D] hover:text-[#0A1128]'
              }`}
            >
              Com a Metrys (Operação Fluida)
            </button>
          </div>
        </div>

        {/* Dynamic Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <AnimatePresence>
            {comparisonItems.map((item, index) => {
              const isAfter = activeMode === 'after';
              const data = isAfter ? item.after : item.before;
              const Icon = item.icon;

              return (
                <motion.div
                  key={`${item.title}-${activeMode}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className={`p-7 rounded-2xl border transition-all duration-200 shadow-card flex flex-col justify-between ${
                    isAfter
                      ? 'bg-white border-[#CBD5E1] hover:border-[#0A1128]'
                      : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 rounded-xl ${
                            isAfter
                              ? 'bg-[#F1F5F9] text-[#0A1128]'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-[#0A1128]">
                          {item.title}
                        </h3>
                      </div>

                      {isAfter ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                      )}
                    </div>

                    <div
                      className={`inline-block text-xs font-bold font-display px-3 py-1 rounded-md ${
                        isAfter
                          ? 'bg-[#F8FAFC] text-[#2A4365] border border-[#E2E8F0]'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {data.tag}
                    </div>

                    <p className="text-sm text-[#52667D] leading-relaxed">
                      {data.text}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-display font-semibold">
                    <span className="text-[#52667D]">Métrica Observada:</span>
                    <span
                      className={
                        isAfter ? 'text-[#0A1128] font-bold' : 'text-rose-700 font-bold'
                      }
                    >
                      {data.metric}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Human Touch Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-[#0A1128]">
              Pronto para migrar sua empresa para uma operação inteligente?
            </h4>
            <p className="text-xs text-[#52667D]">
              Nossa equipe faz todo o trabalho pesado de configuração, integração e treinamento para sua equipe.
            </p>
          </div>
          <button
            onClick={onCtaClick}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0A1128] hover:bg-[#1E2E4A] transition-all shadow-sm active:scale-95"
          >
            <span>Ver na Prática</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
