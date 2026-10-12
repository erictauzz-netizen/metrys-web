import type { FC } from 'react';
import { Shield, Lock, Server, FileCheck, CheckCircle2 } from 'lucide-react';

export const SecurityAndCompliance: FC = () => {
  const securityPillars = [
    {
      icon: Shield,
      title: 'Conformidade com a LGPD',
      desc: 'Adequação total à legislação brasileira de proteção de dados. Anonimização e consentimento por padrão.',
    },
    {
      icon: Lock,
      title: 'Isolamento Estrito de Dados',
      desc: 'Os dados da sua empresa nunca são utilizados para treinar modelos abertos nem compartilhados com terceiros.',
    },
    {
      icon: Server,
      title: 'Criptografia em Repouso e Trânsito',
      desc: 'Padrão AES-256 e tráfego criptografado TLS 1.3 em toda a comunicação entre clientes e APIs.',
    },
    {
      icon: FileCheck,
      title: 'Logs e Rastreabilidade Completa',
      desc: 'Trilha de auditoria detalhada para cada ação, resposta e automação gerada pelo ecossistema Metrys.',
    },
  ];

  return (
    <section id="seguranca" className="py-20 relative bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-xs font-display font-bold text-[#0A1128] uppercase tracking-wider shadow-card">
            <Lock className="w-3.5 h-3.5 text-[#2A4365]" />
            Segurança Empresarial Auditada
          </div>

          <h2 className="text-3xl font-black text-[#0A1128] tracking-tight">
            Seus Dados Blindados. Sua Operação Confiável.
          </h2>

          <p className="text-sm sm:text-base text-[#52667D]">
            A infraestrutura METRYS foi construída para atender aos mais altos requisitos de compliance, governança e estabilidade corporativa.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-card space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0A1128]">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0A1128]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#52667D] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-display font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Auditado</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
