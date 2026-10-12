import type { FC } from 'react';
import { MetrysLogo } from './MetrysLogo';
import { ArrowUp, ShieldCheck } from 'lucide-react';

export const Footer: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A1128] text-white pt-16 pb-12 text-left border-t border-[#1E2E4A]">
      <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1E2E4A]">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl inline-block">
                <MetrysLogo size="md" />
              </div>
            </div>
            <p className="text-sm text-[#9FB2C8] max-w-sm leading-relaxed mt-3">
              Soluções empresariais de inteligência artificial, automação operacional, gestão comercial preditiva e desenvolvimento de sistemas de alta performance.
            </p>
            <div className="flex items-center gap-2 text-xs font-display text-[#CBD7E5] pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Infraestrutura Segura & Em Conformidade LGPD</span>
            </div>
          </div>

          {/* Solutions Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider">
              Ecossistema de Soluções
            </h4>
            <ul className="space-y-2 text-xs text-[#CBD7E5]">
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  <strong className="text-white">METRYS CRM</strong> — Gestão comercial
                </a>
              </li>
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  <strong className="text-white">METRYS AI</strong> — Agentes inteligentes
                </a>
              </li>
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  <strong className="text-white">METRYS AUTOMAÇÕES</strong> — Automações e integrações
                </a>
              </li>
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  <strong className="text-white">METRYS SOB MEDIDA</strong> — Desenvolvimento de sistemas
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-[#CBD7E5]">
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  Soluções
                </a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-white transition-colors">
                  Metodologia Humana
                </a>
              </li>
              <li>
                <a href="#historias" className="hover:text-white transition-colors">
                  Casos de Sucesso
                </a>
              </li>
              <li>
                <a href="#seguranca" className="hover:text-white transition-colors">
                  Segurança & LGPD
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Status (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider">
              Atendimento Corporativo
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CBD7E5]">
              <li>
                <a
                  href="#contato"
                  className="inline-flex items-center gap-1.5 text-white font-semibold hover:text-[#CBD7E5] transition-colors"
                >
                  <span>Formulário de Contato</span>
                  <span>→</span>
                </a>
              </li>
              <li className="text-[#9FB2C8] text-[11px] leading-relaxed">
                Atendimento executivo sob termo de sigilo corporativo.
              </li>
              <li className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E2E4A] text-emerald-400 border border-emerald-500/30 text-[10px] font-display font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sistemas Operacionais
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9FB2C8]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>© {new Date().getFullYear()} METRYS TECNOLOGIA. Todos os direitos reservados.</span>
            <span className="hidden sm:inline text-[#1E2E4A]">•</span>
            <span className="font-semibold text-white tracking-wider">TECNOLOGIA QUE MOVE NEGÓCIOS</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-bold text-[#CBD7E5] hover:text-white bg-[#111D38] border border-[#1E2E4A] px-3.5 py-2 rounded-lg transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
