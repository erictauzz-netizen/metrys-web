import type { FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface SegmentCasesSectionProps {
  onCtaClick: () => void;
}

export const SegmentCasesSection: FC<SegmentCasesSectionProps> = ({ onCtaClick }) => {
  const cases = [
    {
      id: 'construction',
      segment: 'Construção Civil',
      image: '/images/case-construction.jpg',
      headline: '+45% em vendas com automações e CRM',
    },
    {
      id: 'health',
      segment: 'Saúde',
      image: '/images/case-health.jpg',
      headline: '-60% no tempo de atendimento',
    },
    {
      id: 'commerce',
      segment: 'Comércio',
      image: '/images/case-commerce.jpg',
      headline: '+32% de conversão de leads em clientes',
    },
  ];

  return (
    <section className="py-20 relative bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Layout: Left Column Header + Right Column 3 Visual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading and Description (4 cols) */}
          <div className="lg:col-span-4 text-left space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A1128] tracking-tight leading-tight">
              Resultados Reais <br className="hidden sm:inline" />
              para Empresas Reais
            </h2>

            <p className="text-sm text-[#52667D] leading-relaxed">
              A METRYS já ajudou empresas de diferentes segmentos a ganhar eficiência, aumentar vendas e reduzir custos com tecnologia aplicada.
            </p>

            <div className="pt-2">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E2E4A] hover:text-[#0A1128] group transition-colors"
              >
                <span>Ver todos os casos</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Photographic Cards (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cases.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={onCtaClick}
                className="group relative h-72 sm:h-80 lg:h-88 rounded-2xl overflow-hidden border border-[#CBD5E1] shadow-card hover:shadow-card-hover cursor-pointer flex flex-col justify-between p-6 text-left"
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.segment}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/95 via-[#0A1128]/50 to-[#0A1128]/25" />

                {/* Top Segment Tag */}
                <div className="relative z-10 self-start">
                  <span className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white shadow-sm">
                    {item.segment}
                  </span>
                </div>

                {/* Bottom Metric & Link */}
                <div className="relative z-10 space-y-2">
                  <h3 className="text-base sm:text-lg font-black text-white leading-snug tracking-tight">
                    {item.headline}
                  </h3>

                  <div className="inline-flex items-center gap-1 text-xs font-bold text-[#CBD7E5] group-hover:text-white transition-colors">
                    <span>Ver case</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
