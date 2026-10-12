import { useState, useEffect, type FC } from 'react';
import { MetrysLogo } from './MetrysLogo';
import { Menu, X, ArrowUpRight, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Soluções', href: '#solucoes' },
    { name: 'Metodologia', href: '#metodologia' },
    { name: 'Casos Reais', href: '#historias' },
    { name: 'Segurança & LGPD', href: '#seguranca' },
    { name: 'Dúvidas', href: '#faq' },
  ];

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
            <a href="#" className="flex items-center">
              <MetrysLogo size="md" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-[#345279] hover:text-[#0A1128] transition-colors py-1 relative"
              >
                {link.name}
              </a>
            ))}
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
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 px-3 bg-white border border-[#E2E8F0] rounded-xl space-y-2 shadow-xl animate-in fade-in duration-150">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-sm font-semibold text-[#1E2E4A] hover:bg-[#F1F5F9] rounded-lg"
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
          </div>
        )}
      </div>
    </header>
  );
};
