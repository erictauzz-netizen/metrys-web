import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Bot, BarChart3, GitFork, Code2, ArrowRight } from 'lucide-react';
import { updatePillarInterest } from '../lib/attribution';

interface SolutionsPillBannersProps {
  onSelectSolution?: (solutionId: string) => void;
}

export const SolutionsPillBanners: FC<SolutionsPillBannersProps> = () => {
  const items = [
    {
      id: 'ai',
      title: 'Agentes de IA',
      badge: 'Atendimento 24/7',
      description: 'Atendimento, qualificação instantânea de leads e agendamentos.',
      icon: Bot,
      accent: 'from-blue-600 to-indigo-700',
      href: '/solucoes/agentes-ia-whatsapp-voz',
    },
    {
      id: 'crm',
      title: 'Gestão Comercial',
      badge: 'Funis & Pipeline',
      description: 'CRM inteligente para organizar, prever e acelerar suas vendas.',
      icon: BarChart3,
      accent: 'from-emerald-600 to-teal-700',
      href: '/solucoes/crm-b2b',
    },
    {
      id: 'flow',
      title: 'Automações',
      badge: 'Zero Retrabalho',
      description: 'Processos conectados entre ERPs, WhatsApp e plataformas fiscais.',
      icon: GitFork,
      accent: 'from-amber-600 to-orange-700',
      href: '/solucoes/automacoes-integracoes-erp',
    },
    {
      id: 'systems',
      title: 'Software Sob Medida',
      badge: 'Engenharia Dedicada',
      description: 'Sistemas e portais personalizados para a realidade da sua empresa.',
      icon: Code2,
      accent: 'from-violet-600 to-purple-800',
      href: '/solucoes/software-sob-medida',
    },
  ];

  return (
    <section className="relative -mt-6 sm:-mt-10 lg:-mt-12 z-20 max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
      <h2 className="sr-only">Módulos e Soluções do Ecossistema METRYS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.id}
              href={item.href}
              onClick={() => updatePillarInterest(item.id)}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-[#CBD5E1] shadow-card hover:shadow-card-hover hover:border-[#0A1128] transition-all duration-200 flex items-center justify-between gap-4 text-left relative overflow-hidden"
            >
              {/* Top subtle highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#0A1128] transition-colors" />

              {/* Left Round Icon with smooth background */}
              <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] border border-[#CBD5E1] flex-shrink-0 flex items-center justify-center text-[#0A1128] group-hover:bg-[#0A1128] group-hover:text-white transition-colors duration-200">
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>

              {/* Middle Text */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm font-black text-[#0A1128] tracking-tight group-hover:text-[#1E2E4A] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[11px] text-[#475569] leading-snug line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Right Circular Arrow Button */}
              <div className="w-8 h-8 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex-shrink-0 flex items-center justify-center text-[#475569] group-hover:bg-[#0A1128] group-hover:text-white group-hover:border-transparent transition-all duration-200">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
};
