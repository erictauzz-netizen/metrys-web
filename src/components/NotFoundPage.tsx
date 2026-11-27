import { type FC } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ArrowLeft, MessageSquare } from 'lucide-react';

export const NotFoundPage: FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1128] flex flex-col font-sans selection:bg-[#0A1128] selection:text-white">
      <Navbar onOpenContact={() => { window.location.href = '/#formulario'; }} />

      <main className="flex-1 flex items-center justify-center py-24 px-4 sm:px-8">
        <div className="max-w-xl w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
            Erro 404 • Rota Não Localizada
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-[#0A1128] tracking-tight">
            Página Não Encontrada
          </h1>

          <p className="text-base text-[#475569] leading-relaxed">
            O endereço que você tentou acessar não existe ou foi realocado. Utilize os botões abaixo para retornar à página inicial ou falar diretamente com nossos especialistas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0A1128] hover:bg-[#1E2E4A] shadow-md transition-colors w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para o Início</span>
            </a>

            <a
              href="/#formulario"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#0A1128] bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] shadow-sm transition-colors w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 text-[#1E2E4A]" />
              <span>Fale com a Gente</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
