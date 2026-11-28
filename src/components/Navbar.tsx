import { useState, useEffect, useRef, type FC, type MouseEvent, type FocusEvent, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MetrysLogo } from './MetrysLogo';
import { Menu, X, ArrowUpRight, PhoneCall, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

const SOLUTION_LINKS = [
  { name: 'CRM B2B', desc: 'Pipeline Kanban & WhatsApp', href: '/solucoes/crm-b2b' },
  { name: 'Agentes de IA & Voz', desc: 'Triagem 24/7 & Troncos SIP', href: '/solucoes/agentes-ia-whatsapp-voz' },
  { name: 'Automações & ERP', desc: 'Bling, Omie, Totvs e SAP', href: '/solucoes/automacoes-integracoes-erp' },
  { name: 'Software Sob Medida', desc: 'Sistemas Web & Portais', href: '/solucoes/software-sob-medida' },
];

export const Navbar: FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const hoverOpenedAtRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Soluções', href: '/#solucoes', hash: '#solucoes', hasDropdown: true },
    { name: 'Metodologia', href: '/#metodologia', hash: '#metodologia', hasDropdown: false },
    { name: 'Cenários', href: '/#historias', hash: '#historias', hasDropdown: false },
    { name: 'Segurança & LGPD', href: '/#seguranca', hash: '#seguranca', hasDropdown: false },
    { name: 'Dúvidas', href: '/#faq', hash: '#faq', hasDropdown: false },
  ];

  useEffect(() => {
    const sectionIds = ['solucoes', 'metodologia', 'historias', 'seguranca', 'faq'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleHomeSectionClick = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
        setSolutionsOpen(false);
      }
    }
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] py-3.5 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm border-b border-[#E2E8F0]/70 py-4'
      }`}
    >
      <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center">
            <a href="/" onClick={handleLogoClick} className="flex items-center">
              <MetrysLogo size="md" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Navegação Principal" className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.hash;
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => {
                      hoverOpenedAtRef.current = Date.now();
                      setSolutionsOpen(true);
                    }}
                    onMouseLeave={() => {
                      hoverOpenedAtRef.current = 0;
                      setSolutionsOpen(false);
                    }}
                    onBlur={(e: FocusEvent<HTMLDivElement>) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                        hoverOpenedAtRef.current = 0;
                        setSolutionsOpen(false);
                      }
                    }}
                    onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                      if (e.key === 'Escape') {
                        hoverOpenedAtRef.current = 0;
                        setSolutionsOpen(false);
                      }
                    }}
                  >
                    <div className="flex items-center gap-1 py-1 relative">
                      <a
                        href={link.href}
                        onClick={(e) => handleHomeSectionClick(e, link.hash)}
                        className={`text-sm font-semibold transition-colors ${
                          isActive ? 'text-[#0A1128]' : 'text-[#475569] hover:text-[#0A1128]'
                        }`}
                      >
                        {link.name}
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSolutionsOpen((prev) => {
                            if (prev && Date.now() - hoverOpenedAtRef.current < 300) {
                              hoverOpenedAtRef.current = 0;
                              return true;
                            }
                            hoverOpenedAtRef.current = 0;
                            return !prev;
                          });
                        }}
                        aria-expanded={solutionsOpen}
                        aria-label="Abrir submenu de soluções"
                        className="p-0.5 text-[#475569] hover:text-[#0A1128] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1128]"
                      >
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${solutionsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0A1128] rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </div>

                    {/* Crawlable SSR Dropdown for all 4 /solucoes/* pages */}
                    <div
                      className={`absolute left-0 top-full pt-2 w-72 transition-all duration-150 ${
                        solutionsOpen
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white rounded-xl border border-[#CBD5E1] shadow-xl p-2 space-y-1">
                        {SOLUTION_LINKS.map((sol) => (
                          <a
                            key={sol.href}
                            href={sol.href}
                            className="block px-3 py-2.5 rounded-lg hover:bg-[#F1F5F9] transition-colors"
                          >
                            <span className="block text-xs font-bold text-[#0A1128]">{sol.name}</span>
                            <span className="block text-[11px] text-[#475569]">{sol.desc}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleHomeSectionClick(e, link.hash)}
                  className={`text-sm font-semibold transition-colors py-1 relative ${
                    isActive ? 'text-[#0A1128]' : 'text-[#475569] hover:text-[#0A1128]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0A1128] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* CTA Agendar Reunião */}
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0A1128] hover:bg-[#1E2E4A] rounded-lg shadow-sm transition-all active:scale-95"
            >
              <span>Falar com Especialista</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile & Tablet Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0A1128] bg-white border border-[#E2E8F0] rounded-lg"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-3 pt-3 pb-4 px-3 bg-white border border-[#E2E8F0] rounded-xl space-y-2 shadow-xl"
            >
              <div className="pb-2 border-b border-[#E2E8F0] space-y-1">
                <span className="block px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#475569]">
                  Páginas de Solução
                </span>
                {SOLUTION_LINKS.map((sol) => (
                  <a
                    key={sol.href}
                    href={sol.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-semibold text-[#0A1128] hover:bg-[#F1F5F9] rounded-lg transition-colors"
                  >
                    {sol.name}
                  </a>
                ))}
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleHomeSectionClick(e, link.hash)}
                  className={`block px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                    activeSection === link.hash ? 'bg-[#F1F5F9] text-[#0A1128]' : 'text-[#1E2E4A] hover:bg-[#F1F5F9]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-[#E2E8F0]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-[#0A1128] hover:bg-[#1E2E4A]"
                >
                  <PhoneCall className="w-4 h-4" />
                  Agendar Reunião
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
