import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'A inteligência artificial vai substituir meus colaboradores?',
      a: 'Não. Nosso objetivo é libertar seus profissionais do trabalho braçal e repetitivo (copiar dados de planilhas, conferir notas fiscais, responder as mesmas dúvidas de clientes 50 vezes ao dia). Com a Metrys, sua equipe tem tempo para conversar com clientes, negociar melhores margens e fechar contratos.',
    },
    {
      q: 'Preciso trocar o meu ERP, CRM ou WhatsApp atual para usar a Metrys?',
      a: 'Não. O ecossistema Metrys foi projetado para conviver e potencializar o que sua empresa já utiliza. O Metrys Automações conecta seu WhatsApp corporativo aos seus sistemas existentes (como Bling, Omie, Totvs, SAP, RD Station ou sistemas próprios) sem quebrar o fluxo atual.',
    },
    {
      q: 'Como é garantida a segurança dos dados e o cumprimento da LGPD?',
      a: 'Toda a infraestrutura opera com isolamento rigoroso por empresa (Zero-Data-Leak). Seus dados financeiros, listas de clientes e regras contratuais nunca são compartilhados nem utilizados para treinar modelos públicos abertos. Cumprimos integralmente a LGPD com criptografia AES-256 e logs auditáveis.',
    },
    {
      q: 'Quanto tempo leva para ver a solução funcionando na minha empresa?',
      a: 'O tempo de implantação dos agentes de atendimento e fluxos essenciais de CRM varia tipicamente entre 5 e 15 dias úteis. Nossa equipe de engenharia realiza os testes e a homologação junto com você antes de colocar a operação em produção.',
    },
    {
      q: 'Minha equipe terá suporte se tiver dúvidas após a implantação?',
      a: 'Sim, suporte humanizado de verdade. Você tem um canal direto via WhatsApp com seu gerente de conta e equipe de engenharia para tirar dúvidas operacionais, solicitar ajustes e treinar novos colaboradores que entrarem na empresa.',
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 relative bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-[1200px] 2xl:max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-xs font-display font-bold text-[#1E2E4A] uppercase tracking-wider shadow-card">
            <HelpCircle className="w-3.5 h-3.5 text-[#2A4365]" />
            Dúvidas Comuns
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0A1128] tracking-tight">
            Perguntas Frequentes
          </h2>

          <p className="text-base text-[#52667D]">
            Respostas claras sobre como a tecnologia e o acompanhamento humano da Metrys operam na prática.
          </p>
        </div>

        {/* Accordion List with Framer Motion */}
        <div className="space-y-3.5 text-left">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-card transition-colors hover:border-[#CBD5E1]"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-[#0A1128]">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-1 rounded-lg bg-[#F8FAFC] text-[#52667D] flex-shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#52667D] leading-relaxed border-t border-[#F1F5F9] pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
