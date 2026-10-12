import type { FC } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Headphones, Compass, GraduationCap, ShieldCheck, Check } from 'lucide-react';

export const HumanInTheLoop: FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico por Especialista',
      desc: 'Um consultor sênior da Metrys analisa seus gargalos, seus softwares atuais e seus objetivos antes de qualquer linha de código.',
      icon: Compass,
    },
    {
      number: '02',
      title: 'Configuração & Integração',
      desc: 'Nossa equipe de engenharia cuida de toda a parametrização técnica, conectando o WhatsApp, ERPs e regras de negócio sem sobrecarregar sua equipe.',
      icon: ShieldCheck,
    },
    {
      number: '03',
      title: 'Treinamento Prático da sua Equipe',
      desc: 'Capacitamos seus vendedores e operadores em sessões ao vivo. Ninguém fica perdido nem com medo de usar a tecnologia.',
      icon: GraduationCap,
    },
    {
      number: '04',
      title: 'Suporte Direto via WhatsApp',
      desc: 'Nada de tickets infinitos ou robôs que não entendem. Você fala diretamente com um gerente de conta dedicado.',
      icon: Headphones,
    },
  ];

  return (
    <section id="metodologia" className="py-24 relative bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-xs font-display font-bold text-[#0A1128] uppercase tracking-wider shadow-card">
            <HeartHandshake className="w-3.5 h-3.5 text-[#2A4365]" />
            Parceria de Longo Prazo
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A1128] tracking-tight">
            Tecnologia de Ponta com{' '}
            <span className="text-[#2A4365]">Acompanhamento 100% Humano</span>
          </h2>

          <p className="text-base text-[#52667D]">
            Não entregamos um sistema solto para sua empresa se virar sozinha. Nossos engenheiros e consultores participam ativamente da implantação e do sucesso da sua operação.
          </p>
        </div>

        {/* Corporate Meeting Room Banner (Ambient People in Boardroom) */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-[#CBD5E1] shadow-card bg-white grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-[380px]">
            <img
              src="/images/meeting-room.jpg"
              alt="Reunião de consultoria estratégica da Metrys em sala de diretoria"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/40 hidden lg:block" />
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between text-left space-y-5">
            <div className="space-y-3">
              <span className="text-xs font-display font-bold text-[#2A4365] uppercase tracking-wider block">
                MÉTODO METRYS DE IMPLANTAÇÃO
              </span>
              <h3 className="text-2xl font-black text-[#0A1128] leading-snug">
                Sua Diretoria Sentada à Mesa com Especialistas que Entendem do seu Setor
              </h3>
              <p className="text-xs sm:text-sm text-[#52667D] leading-relaxed">
                Antes de ativar qualquer automação, nossos consultores mapeiam o dia a dia real dos seus vendedores e operadores para que a tecnologia resolva o problema exato que custa dinheiro à sua empresa.
              </p>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] space-y-2 text-xs font-semibold text-[#0A1128]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Zero interrupção nas vendas durante a migração</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Treinamento prático direto com a sua equipe</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Steps Timeline Grid with Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={st.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white p-7 rounded-2xl border border-[#E2E8F0] hover:border-[#0A1128] transition-all duration-200 shadow-card flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center text-[#0A1128]">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-3xl font-black font-display text-[#D5DFEB]">
                      {st.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0A1128]">
                    {st.title}
                  </h3>

                  <p className="text-xs text-[#52667D] leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F1F5F9] flex items-center gap-1.5 text-[11px] font-bold text-[#2A4365]">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Assistência Garantida</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
