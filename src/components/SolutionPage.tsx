import { type FC } from 'react';
import { Navbar } from './Navbar';
import { Breadcrumbs } from './Breadcrumbs';
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
  Database,
  PhoneCall,
  Layers,
  Code2,
  Cpu,
  Globe2,
  CalendarDays,
  GitBranch,
} from 'lucide-react';

interface SolutionPageProps {
  meta: RouteMeta;
  onOpenContact?: () => void;
}

function formatDateBr(isoDate: string): string {
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
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
        {/* Breadcrumb Navigation & Freshness Date */}
        <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Breadcrumbs items={meta.breadcrumbs} />
          <div className="inline-flex items-center gap-1.5 text-xs text-[#475569] font-medium">
            <CalendarDays className="w-3.5 h-3.5 text-[#1E2E4A]" aria-hidden="true" />
            <span>
              Atualizado em{' '}
              <time dateTime={meta.dateModified}>{formatDateBr(meta.dateModified)}</time>
            </span>
          </div>
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
                  <span>Visão Geral &amp; Definição Técnica</span>
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
                  <span>
                    Prazo Estimado de Implantação:{' '}
                    <strong className="text-[#0A1128]">{meta.sla}</strong>
                  </span>
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

        {/* Especificações Técnicas & Integrações */}
        {(meta.especificacoes || meta.integracoes) && (
          <section className="py-12 bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {meta.especificacoes && (
                <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1] flex items-center justify-center text-[#0A1128]">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-[#0A1128] tracking-tight">
                        Especificações Técnicas
                      </h2>
                      <p className="text-xs text-[#475569]">
                        Arquitetura, segurança LGPD e modelo operacional
                      </p>
                    </div>
                  </div>

                  <dl className="divide-y divide-[#F1F5F9]">
                    {meta.especificacoes.map((spec) => (
                      <div key={spec.label} className="py-3.5 first:pt-1 last:pb-1 space-y-1">
                        <dt className="text-xs font-bold uppercase tracking-wider text-[#1E2E4A]">
                          {spec.label}
                        </dt>
                        <dd className="text-sm text-[#334155] leading-relaxed">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {meta.integracoes && (
                <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1] flex items-center justify-center text-[#0A1128]">
                      <GitBranch className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-[#0A1128] tracking-tight">
                        Integrações e Conectividade
                      </h2>
                      <p className="text-xs text-[#475569]">
                        Conexão com ferramentas corporativas sem ruptura da operação
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {meta.integracoes.map((group) => (
                      <div
                        key={group.category}
                        className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <h3 className="text-sm font-bold text-[#0A1128]">
                            {group.category}
                          </h3>
                          <ul className="space-y-1">
                            {group.items.map((item) => (
                              <li key={item} className="text-xs font-semibold text-[#1E2E4A] flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-xs text-[#475569] leading-relaxed pt-2 border-t border-[#E2E8F0]">
                          {group.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Semantic Comparison Table */}
        {meta.comparativo && (
          <section className="py-12 bg-white border-b border-[#E2E8F0]">
            <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-black text-[#0A1128] tracking-tight">
                  Comparativo Técnico e Operacional
                </h2>
                <p className="text-sm sm:text-base text-[#475569] mt-2">
                  {meta.comparativo.caption}
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-[#CBD5E1] shadow-sm">
                <table className="w-full text-left border-collapse bg-white">
                  <caption className="sr-only">{meta.comparativo.caption}</caption>
                  <thead className="bg-[#0A1128] text-white">
                    <tr>
                      <th scope="col" className="px-5 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider">
                        {meta.comparativo.columns[0]}
                      </th>
                      <th scope="col" className="px-5 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#CBD7E5]">
                        {meta.comparativo.columns[1]}
                      </th>
                      <th scope="col" className="px-5 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-300">
                        {meta.comparativo.columns[2]}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {meta.comparativo.rows.map((row) => (
                      <tr key={row.criterio} className="hover:bg-[#F8FAFC] transition-colors">
                        <th scope="row" className="px-5 py-4 text-xs sm:text-sm font-bold text-[#0A1128] align-top">
                          {row.criterio}
                        </th>
                        <td className="px-5 py-4 text-xs sm:text-sm text-[#475569] align-top">
                          {row.tradicional}
                        </td>
                        <td className="px-5 py-4 text-xs sm:text-sm font-semibold text-[#0A1128] align-top bg-emerald-50/40">
                          {row.metrys}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Brazil Coverage Section */}
        {meta.coberturaBrasil && (
          <section className="py-12 bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
              <div className="rounded-2xl bg-white border border-[#CBD5E1] p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-bold text-[#0A1128]">
                    <Globe2 className="w-3.5 h-3.5 text-[#1E2E4A]" />
                    <span>Cobertura Nacional</span>
                  </div>
                  <h2 className="text-2xl font-black text-[#0A1128] tracking-tight">
                    {meta.coberturaBrasil.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                    {meta.coberturaBrasil.summary}
                  </p>
                </div>

                <div className="lg:col-span-5 space-y-2.5 bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0]">
                  {meta.coberturaBrasil.points.map((point) => (
                    <div key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0A1128] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Ecosystem Logos */}
        <PartnerLogos />

        {/* Security & Compliance Section */}
        <SecurityAndCompliance />

        {/* Contact Form with Pre-filled interest */}
        <ContactSection
          pillarInterest={meta.pillarKey}
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
