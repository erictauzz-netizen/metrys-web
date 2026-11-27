import { type FC } from 'react';
import { Navbar } from './Navbar';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { SecurityAndCompliance } from './SecurityAndCompliance';
import { PartnerLogos } from './PartnerLogos';
import type { RouteMeta } from '../config/routes';
import {
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  ChevronRight,
  Database,
  PhoneCall,
  Layers,
  Code2,
} from 'lucide-react';

interface SolutionPageProps {
  meta: RouteMeta;
  onOpenContact?: () => void;
}

export const SolutionPage: FC<SolutionPageProps> = ({ meta }) => {
  const scrollToContact = () => {
    const el = document.getElementById('formulario') || document.getElementById('contato');
    if (el) {
      const navbarOffset = 75;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setTimeout(() => {
        const input = el.querySelector<HTMLInputElement>('input[type="text"], input');
        input?.focus({ preventScroll: true });
      }, 450);
    }
  };

  const getPillarIcon = (key?: string) => {
    switch (key) {
      case 'crm':
        return <Database className="w-5 h-5 text-[#1E2E4A]" />;
      case 'ai':
        return <PhoneCall className="w-5 h-5 text-[#1E2E4A]" />;
      case 'flow':
        return <Layers className="w-5 h-5 text-[#1E2E4A]" />;
      case 'systems':
        return <Code2 className="w-5 h-5 text-[#1E2E4A]" />;
      default:
        return <Zap className="w-5 h-5 text-[#1E2E4A]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1128] flex flex-col font-sans selection:bg-[#0A1128] selection:text-white">
      <Navbar onOpenContact={scrollToContact} />

      <main className="flex-1 pt-24 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#64748B] font-medium">
            {meta.breadcrumbs.map((crumb, idx) => (
              <span key={crumb.url} className="flex items-center gap-2">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />}
                {idx === meta.breadcrumbs.length - 1 ? (
                  <span className="text-[#0A1128] font-bold" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <a href={crumb.url} className="hover:text-[#0A1128] transition-colors">
                    {crumb.name}
                  </a>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Hero Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#1E2E4A] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#0A1128] uppercase font-display">
                  {meta.badge}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A1128] tracking-tight leading-[1.15]">
                {meta.h1}
              </h1>

              {/* Answer-First Block */}
              <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E2E4A] uppercase tracking-wider">
                  {getPillarIcon(meta.pillarKey)}
                  <span>Visão Geral & Definição Técnica</span>
                </div>
                <p className="text-base sm:text-lg text-[#334155] leading-relaxed font-normal">
                  {meta.answerFirst}
                </p>
              </div>

              {/* Action Buttons & SLA indicator */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0A1128] hover:bg-[#1E2E4A] shadow-md transition-colors"
                >
                  <span>Solicitar Orçamento Deste Módulo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100/80 border border-slate-200 text-xs font-semibold text-[#475569]">
                  <Clock className="w-4 h-4 text-[#1E2E4A] flex-shrink-0" />
                  <span>Prazo Estimado de Implantação: <strong className="text-[#0A1128]">{meta.sla}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="py-12 bg-white border-y border-[#E2E8F0]">
          <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-2xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A1128] tracking-tight">
                Principais Capacidades e Entregáveis Técnicos
              </h2>
              <p className="text-sm sm:text-base text-[#475569] mt-2">
                Arquitetura homologada para empresas que buscam segurança, escalabilidade e integração com seu ecossistema atual.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {meta.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#CBD5E1] flex items-center justify-center text-[#0A1128] font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h3 className="text-base font-bold text-[#0A1128]">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Pronto para Integração</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem Logos */}
        <PartnerLogos />

        {/* Security & Compliance Section */}
        <SecurityAndCompliance />

        {/* Contact Form with Pre-filled interest */}
        <ContactSection
          initialNotes={
            meta.solutionName
              ? `Interesse prioritário no módulo ${meta.solutionName}.`
              : 'Gostaria de entender a implantação na minha empresa.'
          }
        />
      </main>

      <Footer />
    </div>
  );
};
