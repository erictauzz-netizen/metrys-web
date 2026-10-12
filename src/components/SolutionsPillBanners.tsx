import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Bot, BarChart3, GitFork, Code2, ArrowRight } from 'lucide-react';

interface SolutionsPillBannersProps {
  onSelectSolution: (solutionId: string) => void;
}

export const SolutionsPillBanners: FC<SolutionsPillBannersProps> = ({ onSelectSolution }) => {
  const items = [
    {
      id: 'ai',
      title: 'Agentes de IA',
      description: 'Atendimento, qualificação de leads, agendamentos e muito mais.',
      icon: Bot,
    },
    {
      id: 'crm',
      title: 'Gestão Comercial',
      description: 'CRM inteligente para organizar e acelerar suas vendas.',
      icon: BarChart3,
    },
    {
      id: 'flow',
      title: 'Automações',
      description: 'Processos conectados entre equipes, sistemas e canais.',
      icon: GitFork,
    },
    {
      id: 'systems',
      title: 'Software Sob Medida',
      description: 'Sistemas personalizados para a realidade da sua empresa.',
      icon: Code2,
    },
  ];

  return (
    <section className="relative mt-6 sm:-mt-8 lg:-mt-10 z-20 max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -3 }}
              onClick={() => onSelectSolution(item.id)}
              className="group cursor-pointer bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-card hover:border-[#1E2E4A]/30 transition-all flex items-center justify-between gap-4 text-left"
            >
              {/* Left Round Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#EAF2FD] border border-[#D5E5FA] flex-shrink-0 flex items-center justify-center text-[#2A60B4] group-hover:bg-[#0A1128] group-hover:text-white transition-colors">
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>

              {/* Middle Text */}
              <div className="flex-1 min-w-0 pr-1">
                <h3 className="text-sm font-black text-[#0A1128] tracking-tight group-hover:text-[#1E2E4A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#64748B] leading-snug mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Right Circular Arrow Button */}
              <div className="w-8 h-8 rounded-full bg-[#EAF2FD] flex-shrink-0 flex items-center justify-center text-[#2A60B4] group-hover:bg-[#0A1128] group-hover:text-white transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
