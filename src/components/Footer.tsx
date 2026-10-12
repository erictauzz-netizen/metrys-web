import type { FC } from 'react';
import { MetrysLogo } from './MetrysLogo';
import { ArrowUp, ShieldCheck } from 'lucide-react';

export const Footer: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A1128] text-white pt-10 pb-6 text-left border-t border-[#1E2E4A]">
      <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Main Grid: Compact, proportional layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-[#1E2E4A]/80 items-start">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white rounded-lg inline-block">
                <MetrysLogo size="sm" />
              </div>
            </div>
            <p className="text-xs text-[#9FB2C8] max-w-sm leading-relaxed">
              Inteligência artificial, gestão comercial, automações e software sob medida para empresas de alta performance.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-display text-[#CBD7E5]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Infraestrutura Segura & LGPD sob Sigilo Corporativo</span>
            </div>
          </div>

          {/* Solutions Links (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-[11px] font-display font-bold text-white uppercase tracking-wider">
              Ecossistema
            </h4>
            <ul className="space-y-1.5 text-xs text-[#CBD7E5]">
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  <strong className="text-white">METRYS CRM</strong> — Vendas
                </a>
              </li>
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  <strong className="text-white">METRYS AI</strong> — Agentes IA
                </a>
              </li>
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  <strong className="text-white">METRYS AUTOMAÇÕES</strong> — Processos
                </a>
              </li>
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  <strong className="text-white">METRYS SOB MEDIDA</strong> — Sistemas
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-[11px] font-display font-bold text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-1.5 text-xs text-[#CBD7E5]">
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  Soluções
                </a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-white transition-colors">
                  Metodologia
                </a>
              </li>
              <li>
                <a href="#historias" className="hover:text-white transition-colors">
                  Casos Reais
                </a>
              </li>
              <li>
                <a href="#seguranca" className="hover:text-white transition-colors">
                  Segurança & LGPD
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Dúvidas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-[11px] font-display font-bold text-white uppercase tracking-wider">
              Atendimento
            </h4>
            <ul className="space-y-2 text-xs text-[#CBD7E5]">
              <li>
                <a
                  href="#formulario"
                  className="inline-flex items-center gap-1.5 text-white font-semibold hover:text-[#CBD7E5] transition-colors"
                >
                  <span>Formulário Comercial</span>
                  <span>→</span>
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1E2E4A] text-emerald-400 border border-emerald-500/30 text-[10px] font-display font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sistemas Operacionais
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Compact */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#9FB2C8]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} METRYS TECNOLOGIA. Todos os direitos reservados.</span>
            <span className="hidden sm:inline text-[#1E2E4A]">•</span>
            <span className="font-semibold text-white tracking-wider">TECNOLOGIA QUE MOVE NEGÓCIOS</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[11px] font-bold text-[#CBD7E5] hover:text-white bg-[#111D38] border border-[#1E2E4A] px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
