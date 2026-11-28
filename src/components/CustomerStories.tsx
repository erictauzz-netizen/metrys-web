import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Building2, Layers } from 'lucide-react';

export const CustomerStories: FC = () => {
  const scenarios = [
    {
      segment: 'Distribuição & Logística B2B',
      role: 'Diretoria Comercial',
      image: '/images/executive-man.jpg',
      imageWebp: '/images/executive-man.webp',
      width: 240,
      height: 360,
      module: 'METRYS AI + CRM B2B',
      tagline: 'Qualificação no WhatsApp com registro imediato no funil',
      description:
        'O agente de IA recebe o contato no WhatsApp corporativo, realiza a triagem inicial em menos de 2 segundos e registra o lead classificado no pipeline Kanban com agendamento direto para o consultor.',
    },
    {
      segment: 'Engenharia & Controladoria',
      role: 'Operações e Fiscal',
      image: '/images/executive-woman.jpg',
      imageWebp: '/images/executive-woman.webp',
      width: 240,
      height: 359,
      module: 'METRYS Automações & ERP',
      tagline: 'Faturamento e conciliação integrados ao ERP',
      description:
        'Webhooks bidirecionais conectam o fluxo de vendas ao ERP corporativo, automatizando emissão fiscal, atualização cadastral e logs de conferência sem digitação manual entre sistemas.',
    },
    {
      segment: 'Consultoria & Serviços B2B',
      role: 'Atendimento Corporativo',
      image: '/images/consulting-session.jpg',
      imageWebp: '/images/consulting-session.webp',
      width: 300,
      height: 200,
      module: 'METRYS AI + Sob Medida',
      tagline: 'Triagem 24/7 parametrizada com regras do negócio',
      description:
        'Agentes treinados com manuais internos respondem dúvidas técnicas dentro do escopo aprovado pela empresa, mantendo histórico auditável e transição direta para atendimento humano.',
    },
  ];

  return (
    <section id="historias" className="py-24 relative bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-display font-bold text-[#1E2E4A] uppercase tracking-wider shadow-card">
            <Building2 className="w-3.5 h-3.5 text-[#2A4365]" />
            Cenários de Aplicação
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A1128] tracking-tight">
            Arquitetura METRYS Aplicada à{' '}
            <span className="text-[#2A4365]">Operação</span>
          </h2>

          <p className="text-base text-[#52667D]">
            Exemplos de fluxos corporativos estruturados com CRM B2B, Agentes de IA e integrações ERP para eliminar gargalos operacionais.
          </p>
        </div>

        {/* Scenario Cards Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {scenarios.map((item, idx) => (
            <motion.div
              key={item.segment}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0] hover:border-[#0A1128] transition-all duration-200 shadow-card flex flex-col justify-between text-left relative group"
            >
              <div className="space-y-4">
                {/* Module Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs font-display font-bold text-[#0A1128]">
                  <Layers className="w-3.5 h-3.5 text-[#2A4365]" />
                  <span>{item.module}</span>
                </div>

                <h3 className="text-base font-bold text-[#0A1128]">
                  {item.tagline}
                </h3>

                <p className="text-xs sm:text-sm text-[#52667D] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Area / Segment Info */}
              <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                  <picture>
                    <source srcSet={item.imageWebp} type="image/webp" />
                    <img
                      src={item.image}
                      alt={`${item.role} — ${item.segment}`}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 rounded-full object-cover object-top"
                    />
                  </picture>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0A1128] leading-tight">
                    {item.role}
                  </h4>
                  <span className="text-[11px] font-sans font-semibold text-[#2A4365] block mt-0.5">
                    {item.segment}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
