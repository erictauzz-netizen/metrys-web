import type { FC } from 'react';
import { BarChart3, Bot, GitFork, Code2, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { MetrysLogo } from './MetrysLogo';

interface BrandSignatureBannerProps {
  onPillarClick?: (pillarId: string) => void;
}

export const BrandSignatureBanner: FC<BrandSignatureBannerProps> = ({ onPillarClick }) => {
  const pillars = [
    {
      id: 'crm',
      title: 'METRYS CRM',
      subtitle: 'Gestão comercial',
      icon: BarChart3,
    },
    {
      id: 'ai',
      title: 'METRYS AI',
      subtitle: 'Agentes inteligentes',
      icon: Bot,
    },
    {
      id: 'flow',
      title: 'METRYS FLOW',
      subtitle: 'Automações e integrações',
      icon: GitFork,
    },
    {
      id: 'systems',
      title: 'METRYS SYSTEMS',
      subtitle: 'Desenvolvimento de sistemas',
      icon: Code2,
    },
  ];

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-card">
      
      {/* Top Brand Header */}
      <div className="flex items-center justify-between pb-8 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <MetrysLogo size="lg" />
        </div>
      </div>

      {/* 4 Pillars Horizontal Grid with Vertical Dividers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0] py-8">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <button
              key={pillar.id}
              onClick={() => onPillarClick?.(pillar.id)}
              className="px-4 py-4 sm:py-2 text-center flex flex-col items-center justify-center group hover:bg-[#F8FAFC] rounded-xl transition-all"
            >
              <div className="mb-3 text-[#1E2E4A] group-hover:text-[#0A1128] transition-colors">
                <Icon className="w-8 h-8 stroke-[1.6]" />
              </div>
              <h3 className="text-base sm:text-lg font-black tracking-wider text-[#0A1128] uppercase font-sans">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-[#52667D] mt-1">
                {pillar.subtitle}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2A4365] opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                Explorar módulo <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Corporate Credentials Bar */}
      <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#52667D]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Infraestrutura Corporativa Dedicada com SLA 99.9%</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#2A4365]" />
          <span>Integração Segura com seus Sistemas & ERPs Atuais</span>
        </div>
      </div>

    </div>
  );
};
