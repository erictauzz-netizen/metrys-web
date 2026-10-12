import type { FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, ShieldCheck, Users, Cpu, Headphones } from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
  onPillarSelect?: (pillarId: string) => void;
}

export const Hero: FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 bg-[#F4F7FC] border-b border-[#E2E8F0] overflow-hidden">
      
      {/* Background Soft Blue Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#1E2E4A]/10 via-[#476994]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[450px] h-[300px] bg-blue-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Main Side-by-Side Hook and Integrated Systems Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: High-Converting Hook (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 text-left space-y-6 z-10"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#1E2E4A] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#0A1128] uppercase font-display">
                ECOSSISTEMA CORPORATIVO COM IA
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-black text-[#0A1128] tracking-tight leading-[1.12]">
              Sua empresa opera melhor quando a{' '}
              <span className="text-[#1E2E4A] bg-gradient-to-r from-[#0A1128] via-[#1E2E4A] to-[#2A4365] bg-clip-text text-transparent">
                tecnologia trabalha por você.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed max-w-xl">
              Integramos inteligência artificial, gestão comercial, automações e software personalizado para transformar processos complexos em operações mais eficientes, seguras e lucrativas.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0A1128] hover:bg-[#1E2E4A] shadow-md transition-colors"
              >
                <span>Orçamento Agora</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#0A1128] bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#1E2E4A]" />
                <span>Fale com a Gente</span>
              </motion.button>
            </div>

            {/* 4 Guarantees Trust Indicators (Grid 2x2) */}
            <div className="pt-4 border-t border-[#CBD5E1]/60 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-semibold text-[#475569]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0A1128] flex-shrink-0" />
                <span>100% Adequado à LGPD e Sigilo sob NDA</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0A1128] flex-shrink-0" />
                <span>Implantação Assistida com Especialistas</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#1E2E4A] flex-shrink-0" />
                <span>Integração com seus Sistemas e ERPs Atuais</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-[#1E2E4A] flex-shrink-0" />
                <span>Suporte Contínuo e Evolução Constante</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: LARGE, BORDERLESS Integrated Systems Mockup (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative flex items-center justify-center lg:justify-end mt-6 sm:mt-8 lg:mt-0"
          >
            {/* The Large Systems Graphic sits directly on the section canvas with NO card border, NO box */}
            <div className="relative w-full max-w-lg lg:max-w-none lg:w-[136%] xl:w-[148%] 2xl:w-[158%] lg:-mr-24 xl:-mr-36 2xl:-mr-48 pointer-events-none select-none">
              <img
                src="/images/hero-systems-integrated.png"
                alt="Ecossistema Corporativo METRYS: CRM Dashboard, aplicativo mobile, agente de IA e notificações em tempo real"
                className="w-full h-auto object-contain filter drop-shadow-xl"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
