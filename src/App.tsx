import { useState } from 'react';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
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

export function App() {
  const [contactNotes, setContactNotes] = useState<string>('');

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

    if (solutionId === 'all') {
      setContactNotes('Gostaria de entender a implantação unificada do ecossistema completo.');
    } else if (solutionMap[solutionId]) {
      setContactNotes(`Interesse prioritário no módulo ${solutionMap[solutionId]}.`);
    }

    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1128] flex flex-col font-sans selection:bg-[#0A1128] selection:text-white">
      {/* Sonner Toast Provider */}
      <Toaster position="top-right" theme="light" richColors />

      {/* Navigation */}
      <Navbar onOpenContact={scrollToContact} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Side-by-Side Hook and Perspective Systems Mockup */}
        <Hero
          onOpenContact={scrollToContact}
          onPillarSelect={handleSelectSolution}
        />

        {/* 2. Os 4 Banners Horizontais de Solução (Agentes IA, CRM, Automações, Software) */}
        <SolutionsPillBanners onSelectSolution={handleSelectSolution} />

        {/* 3. Casos Setoriais: Resultados Reais para Empresas Reais (Construção, Saúde, Comércio) */}
        <SegmentCasesSection onCtaClick={scrollToContact} />

        {/* 4. Detalhamento Interativo dos 4 Pilares METRYS (CRM, AI, Flow, Systems) */}
        <SolutionsGrid onSelectSolution={handleSelectSolution} />

        {/* 6. Comparativo Antes vs Depois (Realidade da Empresa) */}
        <BeforeAfterComparison onCtaClick={scrollToContact} />

        {/* 7. Parceria Humana & Implantação Assistida */}
        <HumanInTheLoop />

        {/* 8. Casos Reais de Sucesso com Pessoas & Métricas */}
        <CustomerStories />

        {/* 9. Segurança, LGPD & Blindagem de Dados */}
        <SecurityAndCompliance />

        {/* 10. Perguntas Frequentes (Desmistificando a IA) */}
        <FaqSection />

        {/* 11. Formulário de Agendamento Comercial & Contato */}
        <ContactSection initialNotes={contactNotes} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
