import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PartnerLogos } from './components/PartnerLogos';
import { SolutionsPillBanners } from './components/SolutionsPillBanners';
import { SegmentCasesSection } from './components/SegmentCasesSection';
import { SolutionsGrid } from './components/SolutionsGrid';
import { BeforeAfterComparison } from './components/BeforeAfterComparison';
import { HumanInTheLoop } from './components/HumanInTheLoop';
import { CustomerStories } from './components/CustomerStories';
import { SecurityAndCompliance } from './components/SecurityAndCompliance';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SolutionPage } from './components/SolutionPage';
import { NotFoundPage } from './components/NotFoundPage';
import { ROUTES } from './config/routes';
import { initAttribution, updatePillarInterest } from './lib/attribution';

interface AppProps {
  initialPath?: string;
}

export function App({ initialPath }: AppProps) {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (initialPath) return initialPath.replace(/\/$/, '') || '/';
    if (typeof window !== 'undefined') {
      return window.location.pathname.replace(/\/$/, '') || '/';
    }
    return '/';
  });

  const [contactNotes, setContactNotes] = useState<string>('');

  useEffect(() => {
    // 1. Inicializa atribuição de primeiro toque e UTMs em sessionStorage
    initAttribution();

    // 2. Canonicalização estrita no cliente: remove qualquer ?utm_*, ?fbclid= ou ?gclid=
    try {
      const cleanCanonicalHref = `${window.location.origin}${window.location.pathname.replace(/\/$/, '') || '/'}`;
      let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', cleanCanonicalHref);
    } catch {
      // Ignora erro em ambientes restritos
    }

    // 3. Listener para navegação por histórico do navegador (popstate)
    const handlePopState = () => {
      setCurrentPath(window.location.pathname.replace(/\/$/, '') || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const scrollToContact = () => {
    const formCard = document.getElementById('formulario');
    const targetEl = formCard || document.getElementById('contato');

    if (targetEl) {
      const navbarOffset = 75;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setTimeout(() => {
        const input = targetEl.querySelector<HTMLInputElement>('input[type="text"], input');
        input?.focus({ preventScroll: true });
      }, 450);
    }
  };

  const handleSelectSolution = (solutionId: string) => {
    const solutionMap: Record<string, string> = {
      crm: 'METRYS CRM (Gestão comercial)',
      ai: 'METRYS AI (Agentes inteligentes)',
      flow: 'METRYS Automações (Automações e integrações)',
      systems: 'METRYS Sob Medida (Desenvolvimento de sistemas)',
    };

    updatePillarInterest(solutionId);

    if (solutionId === 'all') {
      setContactNotes('Gostaria de entender a implantação unificada do ecossistema completo.');
    } else if (solutionMap[solutionId]) {
      setContactNotes(`Interesse prioritário no módulo ${solutionMap[solutionId]}.`);
    }

    scrollToContact();
  };

  // Roteamento: Caso rota seja uma das 4 páginas de solução
  if (currentPath !== '/' && ROUTES[currentPath]) {
    return (
      <>
        <Toaster position="top-right" theme="light" richColors />
        <SolutionPage meta={ROUTES[currentPath]} onOpenContact={scrollToContact} />
      </>
    );
  }

  // Roteamento: Caso rota seja 404
  if (currentPath === '/404' || (currentPath !== '/' && !ROUTES[currentPath])) {
    return (
      <>
        <Toaster position="top-right" theme="light" richColors />
        <NotFoundPage />
      </>
    );
  }

  // Rota padrão: Homepage com o ecossistema completo
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1128] flex flex-col font-sans selection:bg-[#0A1128] selection:text-white">
      {/* Sonner Toast Provider */}
      <Toaster position="top-right" theme="light" richColors />

      {/* Navigation */}
      <Navbar onOpenContact={scrollToContact} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenContact={scrollToContact}
          onPillarSelect={handleSelectSolution}
        />

        {/* 2. Os 4 Banners Horizontais de Solução com links semânticos crawlables */}
        <SolutionsPillBanners onSelectSolution={handleSelectSolution} />

        {/* 2b. Partner Logos Ticker — Social Proof Infinite Marquee */}
        <PartnerLogos />

        {/* 3. Casos Setoriais: Resultados Reais para Empresas Reais (Construção, Saúde, Comércio) */}
        <SegmentCasesSection onCtaClick={scrollToContact} />

        {/* 4. Detalhamento Interativo dos 4 Pilares METRYS (CRM, AI, Flow, Systems) */}
        <SolutionsGrid onSelectSolution={handleSelectSolution} />

        {/* 5. Comparativo Antes vs Depois (Realidade da Empresa - Tier B CDC/CONAR) */}
        <BeforeAfterComparison onCtaClick={scrollToContact} />

        {/* 6. Parceria Humana & Implantação Assistida */}
        <HumanInTheLoop />

        {/* 7. Casos Reais de Sucesso com Pessoas & Métricas */}
        <CustomerStories />

        {/* 8. Segurança, LGPD & Blindagem de Dados */}
        <SecurityAndCompliance />

        {/* 9. Perguntas Frequentes (Desmistificando a IA) */}
        <FaqSection />

        {/* 10. Formulário de Agendamento Comercial & Contato */}
        <ContactSection initialNotes={contactNotes} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
