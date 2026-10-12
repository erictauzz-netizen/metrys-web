import { useState, type FC } from 'react';
import { CheckCircle2, HelpCircle, ArrowRight, RefreshCw } from 'lucide-react';

import confetti from 'canvas-confetti';

interface CompanyDiagnosticProps {
  onRecommendationSelect: (solutionNames: string[]) => void;
}

export const CompanyDiagnostic: FC<CompanyDiagnosticProps> = ({ onRecommendationSelect }) => {
  const [step, setStep] = useState(1);
  const [bottleneck, setBottleneck] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [mainChannel, setMainChannel] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const bottlenecks = [
    {
      id: 'leads',
      label: 'Perda de leads e demora no atendimento comercial',
      recommendation: ['METRYS AI', 'METRYS CRM'],
      reason: 'Implementação de agentes inteligentes para resposta instantânea e funil preditivo de vendas.',
    },
    {
      id: 'manual',
      label: 'Tarefas manuais repetitivas e retrabalho entre planilhas/ERPs',
      recommendation: ['METRYS FLOW'],
      reason: 'Orquestração de fluxos automáticos com conciliação e webhooks sem toque humano.',
    },
    {
      id: 'software',
      label: 'Sistemas legados lentos ou falta de plataforma sob medida',
      recommendation: ['METRYS SYSTEMS'],
      reason: 'Engenharia de software moderna e banco de dados corporativo escalável.',
    },
    {
      id: 'all',
      label: 'Queremos transformar a operação de ponta a ponta com IA',
      recommendation: ['METRYS CRM', 'METRYS AI', 'METRYS FLOW', 'METRYS SYSTEMS'],
      reason: 'Implementação do ecossistema completo para aceleração contínua de receita.',
    },
  ];

  const handleFinish = (channel: string) => {
    setMainChannel(channel);
    setIsCompleted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0A1128', '#2A4365', '#FACC15', '#6B82A0'],
    });
  };

  const handleReset = () => {
    setStep(1);
    setBottleneck('');
    setTeamSize('');
    setMainChannel('');
    setIsCompleted(false);
  };

  const selectedBottleneckObj = bottlenecks.find((b) => b.id === bottleneck) || bottlenecks[0];

  return (
    <section id="diagnostico" className="py-24 relative bg-white border-b border-[#E2E8F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-mono font-bold text-[#1E2E4A] uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-[#EAB308]" />
            Diagnóstico em 1 Minuto
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0A1128] tracking-tight">
            Descubra a Solução Ideal para a sua Empresa
          </h2>

          <p className="text-sm sm:text-base text-[#52667D]">
            Responda 3 perguntas objetivas e veja a recomendação do ecossistema Metrys.
          </p>
        </div>

        {/* Card Box */}
        <div className="rounded-2xl bg-[#F8FAFC] p-6 sm:p-10 border border-[#CBD5E1] shadow-card">
          
          {!isCompleted ? (
            <div className="space-y-8">
              {/* Step indicator */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <span className="text-xs font-mono font-bold text-[#52667D] uppercase">
                  Etapa 0{step} de 03
                </span>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 w-8 rounded-full transition-all ${
                        step >= s ? 'bg-[#0A1128]' : 'bg-[#E2E8F0]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4 text-left">
                  <h3 className="text-lg sm:text-xl font-black text-[#0A1128]">
                    Qual é o principal gargalo operacional da sua empresa hoje?
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {bottlenecks.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setBottleneck(item.id);
                          setStep(2);
                        }}
                        className="p-4 rounded-xl text-left bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] hover:border-[#0A1128] text-sm font-semibold text-[#0A1128] transition-all shadow-sm"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4 text-left">
                  <h3 className="text-lg sm:text-xl font-black text-[#0A1128]">
                    Quantos colaboradores estão envolvidos na operação e vendas?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['De 1 a 10 colaboradores', 'De 11 a 50 colaboradores', 'De 51 a 200 colaboradores', 'Acima de 200 colaboradores'].map(
                      (size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setTeamSize(size);
                            setStep(3);
                          }}
                          className="p-4 rounded-xl text-center bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] hover:border-[#0A1128] text-sm font-semibold text-[#0A1128] transition-all shadow-sm"
                        >
                          {size}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-4 text-left">
                  <h3 className="text-lg sm:text-xl font-black text-[#0A1128]">
                    Qual é o canal de relacionamento ou operação mais crítico no momento?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'WhatsApp e Mensagens Diretas',
                      'ERP Corporativo e Financeiro (SAP, Totvs, Bling, etc)',
                      'Plataforma Web / E-commerce próprio',
                      'E-mail e Propostas Comerciais',
                    ].map((chan) => (
                      <button
                        key={chan}
                        onClick={() => handleFinish(chan)}
                        className="p-4 rounded-xl text-center bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] hover:border-[#0A1128] text-sm font-semibold text-[#0A1128] transition-all shadow-sm"
                      >
                        {chan}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Results View */
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Diagnóstico Concluído com Sucesso</span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-[#52667D] hover:text-[#0A1128]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refazer</span>
                </button>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#52667D] uppercase tracking-wider">
                  Módulos Metrys Recomendados:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {selectedBottleneckObj.recommendation.map((rec) => (
                    <span
                      key={rec}
                      className="px-4 py-2 rounded-xl text-sm font-black bg-[#0A1128] text-white shadow-sm"
                    >
                      {rec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] text-sm text-[#334155] shadow-sm">
                <p className="font-bold text-[#0A1128] mb-1">Por que essa combinação?</p>
                <p>{selectedBottleneckObj.reason}</p>
                <div className="mt-3 pt-3 border-t border-[#E2E8F0] text-xs text-[#52667D] flex items-center justify-between">
                  <span>Equipe: {teamSize}</span>
                  <span>Canal prioritário: {mainChannel}</span>
                </div>
              </div>

              <button
                onClick={() => onRecommendationSelect(selectedBottleneckObj.recommendation)}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-[#0A1128] hover:bg-[#1E2E4A] transition-all shadow-sm active:scale-95"
              >
                <span>Solicitar Proposta para essa Arquitetura</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
