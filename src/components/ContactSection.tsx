import { useState, useEffect, type FC, type FormEvent } from 'react';
import { toast } from 'sonner';
import { Send, Phone, Mail, Building2, User, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  initialNotes?: string;
}

export const ContactSection: FC<ContactSectionProps> = ({
  initialNotes = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialNotes) {
      setNotes(initialNotes);
    }
  }, [initialNotes]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast.error('Por favor, preencha seu Nome e Telefone/WhatsApp para continuarmos.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0A1128', '#2A4365', '#1E2E4A', '#6B82A0', '#CBD7E5'],
      });
      toast.success('Solicitação enviada com sucesso! Um consultor entrará em contato em breve.', {
        duration: 5000,
      });
    }, 700);
  };

  return (
    <section id="contato" className="py-24 relative bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-display font-bold text-[#1E2E4A] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#2A4365]" />
              Atendimento Especializado
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#0A1128] tracking-tight leading-tight">
              Vamos Desenhar a Arquitetura da sua Empresa.
            </h2>

            <p className="text-sm sm:text-base text-[#52667D] leading-relaxed">
              Agende uma conversa com nossos especialistas em inteligência artificial e processos. Entendemos seus gargalos e apresentamos um plano prático com estimativa de retorno.
            </p>

            {/* Corporate Consultation Showcase with Real People */}
            <div className="relative rounded-2xl overflow-hidden border border-[#CBD5E1] shadow-card bg-white mt-4">
              <div className="relative h-48 w-full">
                <img
                  src="/images/business-handshake.jpg"
                  alt="Aperto de mão corporativo e alinhamento de diretoria"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-[#0A1128]/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-xs font-bold block">
                    Parceria Estratégica & Confidencialidade
                  </span>
                  <span className="text-[11px] text-[#CBD7E5]">
                    Atendimento sênior direto com a liderança da Metrys
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Contacts & Guarantees */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="p-2.5 rounded-lg bg-white text-[#0A1128] border border-[#CBD5E1]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="text-xs text-[#52667D] block">Sigilo & Confidencialidade</span>
                  <span className="text-sm font-bold text-[#0A1128]">Proteção sob NDA Corporativo</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="p-2.5 rounded-lg bg-white text-[#0A1128] border border-[#CBD5E1]">
                  <User className="w-4 h-4 text-[#0A1128]" />
                </div>
                <div>
                  <span className="text-xs text-[#52667D] block">Atendimento Dedicado</span>
                  <span className="text-sm font-bold text-[#0A1128]">Direto com Especialistas Sênior</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#F8FAFC] p-8 sm:p-10 border border-[#CBD5E1] shadow-card">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <h3 className="text-xl font-black text-[#0A1128] border-b border-[#E2E8F0] pb-3">
                    Solicitar Diagnóstico Comercial
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0A1128] mb-1.5">
                        Nome *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ex: Roberto Silva"
                          className="w-full bg-white border border-[#CBD5E1] focus:border-[#0A1128] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0A1128] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1128] mb-1.5">
                        Telefone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="DDD + Seu WhatsApp ou Telefone"
                          className="w-full bg-white border border-[#CBD5E1] focus:border-[#0A1128] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0A1128] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0A1128] mb-1.5">
                        E-mail <span className="text-[#94A3B8] font-normal">(opcional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="roberto@suaempresa.com"
                          className="w-full bg-white border border-[#CBD5E1] focus:border-[#0A1128] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0A1128] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1128] mb-1.5">
                        Nome da empresa <span className="text-[#94A3B8] font-normal">(opcional)</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Nome da sua empresa"
                          className="w-full bg-white border border-[#CBD5E1] focus:border-[#0A1128] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0A1128] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Open Needs Description Textarea */}
                  <div>
                    <label className="block text-xs font-bold text-[#0A1128] mb-1.5">
                      Descreva o que você precisa <span className="text-[#94A3B8] font-normal">(opcional)</span>
                    </label>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex: Gostaria de integrar nosso atendimento WhatsApp com o funil comercial e automatizar emissão de contratos e notas fiscais."
                      className="w-full bg-white border border-[#CBD5E1] focus:border-[#0A1128] rounded-xl p-3 text-sm text-[#0A1128] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-[#0A1128] hover:bg-[#1E2E4A] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Solicitar Agendamento de Demonstração
                      </span>
                    )}
                  </button>

                  <p className="text-[11px] text-[#52667D] text-center pt-1">
                    🔒 Seus dados são confidenciais e protegidos sob rigoroso sigilo corporativo.
                  </p>
                </form>
              ) : (
                <div className="py-10 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-[#0A1128]">
                    Solicitação Recebida com Sucesso!
                  </h3>
                  <p className="text-sm text-[#52667D] max-w-md mx-auto">
                    Obrigado, <strong className="text-[#0A1128]">{name}</strong>. Nossa equipe técnica da METRYS já recebeu sua mensagem e entrará em contato com você pelo canal informado.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-lg bg-white text-xs font-bold text-[#0A1128] border border-[#CBD5E1]"
                    >
                      Enviar Outra Solicitação
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
