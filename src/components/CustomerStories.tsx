import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Star, Building2, TrendingUp, Quote } from 'lucide-react';

export const CustomerStories: FC = () => {
  const testimonials = [
    {
      name: 'Marcos Vinícius Mendes',
      role: 'Diretor Comercial',
      company: 'Logística & Distribuição Aliança',
      image: '/images/executive-man.jpg',
      metric: '+48% em Vendas',
      tagline: 'Fim dos leads esquecidos no WhatsApp',
      story:
        'Antes da Metrys, nossos vendedores externos perdiam metade do dia tentando responder mensagens e organizando planilhas. Com o Metrys AI e o Metrys CRM, o cliente é qualificado em 2 segundos e agendado com o consultor certo. Nosso faturamento cresceu no primeiro mês de uso.',
    },
    {
      name: 'Camila Duarte',
      role: 'Head de Controladoria & Operações',
      company: 'Grupo Nexus Engenharia',
      image: '/images/executive-woman.jpg',
      metric: '140 Horas Salvas / Mês',
      tagline: 'Automação fiscal sem falhas de digitação',
      story:
        'A conciliação bancária e emissão de notas fiscais era um gargalo que exigia 3 pessoas dedicadas. O Metrys Automações conectou nosso ERP ao sistema de vendas com precisão cirúrgica. Eliminamos o retrabalho manual por completo.',
    },
    {
      name: 'Dr. Roberto Fontes',
      role: 'Sócio-Fundador',
      company: 'Fontes & Associados Soluções B2B',
      image: '/images/consulting-session.jpg',
      metric: '1.2s Tempo de Resposta',
      tagline: 'Atendimento corporativo 24/7 com precisão',
      story:
        'Tínhamos receio de que a IA soasse artificial ou desse informações erradas sobre nossos contratos. A equipe da Metrys parametrizou nossos manuais e regras jurídicas com rigor exemplar. É como ter um profissional sênior de prontidão.',
    },
  ];

  return (
    <section id="historias" className="py-24 relative bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-display font-bold text-[#1E2E4A] uppercase tracking-wider shadow-card">
            <Building2 className="w-3.5 h-3.5 text-[#2A4365]" />
            Lideranças que Confiam na Metrys
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A1128] tracking-tight">
            Casos Reais de Quem Move Negócios com a{' '}
            <span className="text-[#2A4365]">METRYS</span>
          </h2>

          <p className="text-base text-[#52667D]">
            Veja depoimentos diretos de líderes que eliminaram gargalos operacionais e aceleraram a produtividade de suas equipes.
          </p>
        </div>

        {/* Testimonials Cards Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0] hover:border-[#0A1128] transition-all duration-200 shadow-card flex flex-col justify-between text-left relative group"
            >
              {/* Quote Mark */}
              <div className="absolute top-6 right-6 text-[#CBD5E1] group-hover:text-[#9FB2C8] transition-colors">
                <Quote className="w-8 h-8 opacity-40" />
              </div>

              <div className="space-y-4">
                {/* 5 Stars Rating */}
                <div className="flex items-center gap-1 text-[#2A4365]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#2A4365]" />
                  ))}
                </div>

                {/* Metric Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs font-display font-bold text-[#0A1128]">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.metric}</span>
                </div>

                <h3 className="text-base font-bold text-[#0A1128]">
                  "{t.tagline}"
                </h3>

                <p className="text-xs sm:text-sm text-[#52667D] leading-relaxed">
                  {t.story}
                </p>
              </div>

              {/* Author Info with High-res Portrait Photo */}
              <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0A1128] leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-[#52667D] mt-0.5 leading-tight">
                    {t.role}
                  </p>
                  <span className="text-[11px] font-sans font-semibold text-[#2A4365] block mt-0.5">
                    {t.company}
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
