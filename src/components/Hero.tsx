import type { FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, ShieldCheck, Users, Cpu, Headphones, TrendingUp, Zap, Clock } from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
  onPillarSelect?: (pillarId: string) => void;
}

export const Hero: FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 bg-[#F4F7FC] border-b border-[#E2E8F0] overflow-hidden">
      
      {/* Background Soft Blue Ambient Glows & Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-subtle-grid opacity-70">
        <div className="absolute top-1/4 right-0 w-[650px] h-[650px] bg-gradient-to-bl from-[#1E2E4A]/12 via-[#476994]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[350px] bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Main Side-by-Side Hook and Integrated Systems Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: High-Converting Hook (5 cols on lg) */}
          <div className="lg:col-span-5 text-left space-y-6 z-10">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#1E2E4A] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#0A1128] uppercase font-display">
                ECOSSISTEMA CORPORATIVO COM IA
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-black text-[#0A1128] tracking-tight leading-[1.12]">
              CRM B2B, Agentes de IA para WhatsApp e Voz,{' '}
              <span className="text-[#1E2E4A] bg-gradient-to-r from-[#0A1128] via-[#1E2E4A] to-[#2A4365] bg-clip-text text-transparent">
                Automações e Software Sob Medida.
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

            {/* Architecture & SLA Quick Indicators Grid */}
            <div className="pt-3 grid grid-cols-3 gap-3 border-t border-[#CBD5E1]/60">
              <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mb-0.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-sm sm:text-base font-black text-[#0A1128]">Funil Ativo</span>
                </div>
                <span className="text-[10px] text-[#64748B] font-semibold block leading-tight">Follow-up Automatizado</span>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold mb-0.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-sm sm:text-base font-black text-[#0A1128]">&lt; 2s</span>
                </div>
                <span className="text-[10px] text-[#64748B] font-semibold block leading-tight">Triagem com IA</span>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold mb-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-sm sm:text-base font-black text-[#0A1128]">Multi-ERP</span>
                </div>
                <span className="text-[10px] text-[#64748B] font-semibold block leading-tight">Integração Nativa</span>
              </div>
            </div>

            {/* 4 Guarantees Trust Indicators (Grid 2x2) */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold text-[#475569]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0A1128] flex-shrink-0" />
                <span>Adequado à LGPD e Sigilo sob NDA</span>
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
          </div>

          {/* Right Column: LARGE, BORDERLESS Integrated Systems Mockup (7 cols on lg) */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end mt-6 sm:mt-8 lg:mt-0">
            {/* The Large Systems Graphic sits directly on the section canvas with NO card border, NO box */}
            <div className="relative w-full max-w-lg lg:max-w-none lg:w-[136%] xl:w-[148%] 2xl:w-[158%] lg:-mr-24 xl:-mr-36 2xl:-mr-48 pointer-events-none select-none">
              <picture>
                <source srcSet="/images/hero-systems-integrated.webp" type="image/webp" />
                <img
                  src="/images/hero-systems-integrated.png"
                  alt="Ecossistema Corporativo METRYS: CRM Dashboard, aplicativo mobile, agente de IA e notificações em tempo real"
                  width={1298}
                  height={766}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto object-contain filter drop-shadow-xl"
                />
              </picture>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
