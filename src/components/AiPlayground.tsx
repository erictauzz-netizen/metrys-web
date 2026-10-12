import { useState, useRef, useEffect, type FC } from 'react';
import { Bot, Send, User, RefreshCw, CheckCircle2 } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  meta?: {
    actionTaken?: string;
    confidence?: number;
    latencyMs?: number;
  };
}

export const AiPlayground: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Olá! Sou o agente corporativo Metrys AI integrado ao canal de atendimento. Como posso acelerar o atendimento ou as operações da sua empresa hoje?',
      time: '11:00',
      meta: {
        actionTaken: 'Atendimento inicial iniciado',
        confidence: 99.8,
        latencyMs: 34,
      },
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const predefinedScenarios = [
    {
      label: 'Qualificação de Lead Comercial',
      prompt: 'Olá, tenho uma distribuidora com 45 funcionários e perdemos muitos leads no WhatsApp sem follow-up.',
    },
    {
      label: 'Automação de NFs no Metrys Automações',
      prompt: 'Vocês conseguem integrar o faturamento do Bling direto com o nosso sistema interno sem digitar manual?',
    },
    {
      label: 'Segurança de Dados / LGPD',
      prompt: 'Os dados confidenciais dos nossos clientes são compartilhados para treinar IAs públicas?',
    },
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let action = 'Resposta gerada';
      let latency = Math.floor(Math.random() * 20) + 28;

      const lower = text.toLowerCase();

      if (lower.includes('lead') || lower.includes('whatsapp') || lower.includes('vendas') || lower.includes('distribuidora')) {
        reply =
          'Entendido! No seu cenário, conectamos o METRYS AI ao seu WhatsApp oficial. O agente atende instantaneamente, realiza a triagem com perguntas de qualificação e insere o lead classificado diretamente no METRYS CRM. Se o lead for qualificado, a IA dispara o link da agenda do seu vendedor e envia follow-ups automáticos caso ele não responda.';
        action = 'Triagem de Lead + Registro no Metrys CRM';
      } else if (lower.includes('bling') || lower.includes('integrar') || lower.includes('nf') || lower.includes('fluxo') || lower.includes('manual')) {
        reply =
          'Sim, exatamente a especialidade do METRYS AUTOMAÇÕES. Criamos um webhook que escuta a emissão ou alteração de pedido no Bling (ou outro ERP como Omie/Totvs) e sincroniza os dados via API segura com o seu banco de dados interno em menos de 100 milissegundos, com log de auditoria e retry automático.';
        action = 'Mapeamento de Webhook & API REST';
      } else if (lower.includes('seguran') || lower.includes('lgpd') || lower.includes('privacid') || lower.includes('públic')) {
        reply =
          'Não, categoricamente não. Toda a infraestrutura da METRYS opera com isolamento estrito por tenant. Seus dados cadastrais, financeiros e históricos nunca são utilizados para treinar modelos abertos nem compartilhados com terceiros. Cumprimos 100% da LGPD com criptografia AES-256.';
        action = 'Protocolo Zero-Data-Leak Auditado';
      } else {
        reply =
          `Compreendido. Para resolver esse ponto na sua operação, compomos um fluxo unificado entre METRYS AI e METRYS SOB MEDIDA. Nossos agentes executam tarefas com base estrita nos seus manuais operacionais e parâmetros de negócio, sem improvisos.`;
        action = 'Análise de Requisitos Concluída';
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        meta: {
          actionTaken: action,
          confidence: 99.4,
          latencyMs: latency,
        },
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: 'Olá! Sou o agente corporativo Metrys AI integrado ao canal de atendimento. Como posso acelerar o atendimento ou as operações da sua empresa hoje?',
        time: '11:00',
        meta: {
          actionTaken: 'Atendimento inicial iniciado',
          confidence: 99.8,
          latencyMs: 34,
        },
      },
    ]);
  };

  return (
    <section id="playground" className="py-24 relative bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-xs font-mono font-bold text-[#0A1128] uppercase tracking-widest shadow-card">
            <Bot className="w-3.5 h-3.5 text-[#EAB308]" />
            Demonstração Interativa ao Vivo
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A1128] tracking-tight">
            Experimente o <span className="text-[#2A4365]">METRYS AI</span> em Ação
          </h2>

          <p className="text-base text-[#52667D]">
            Veja como nossos agentes compreendem o contexto do seu negócio, acionam regras operacionais e fornecem respostas objetivas sem clichês.
          </p>
        </div>

        {/* Playground Box in Clean Corporate Light */}
        <div className="rounded-2xl bg-white border border-[#CBD5E1] shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Controls Sidebar */}
          <div className="lg:col-span-4 bg-[#F8FAFC] p-6 border-b lg:border-b-0 lg:border-r border-[#E2E8F0] flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold font-mono text-[#0A1128] tracking-wider uppercase">
                    SIMULADOR CORPORATIVO
                  </span>
                </div>
                <button
                  onClick={handleResetChat}
                  className="p-1.5 rounded-lg text-[#52667D] hover:text-[#0A1128] hover:bg-[#E2E8F0] transition-colors"
                  title="Reiniciar conversa"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h4 className="text-[11px] font-bold text-[#52667D] uppercase tracking-wider font-mono mb-2.5">
                  Cenários Rápidos:
                </h4>
                <div className="space-y-2">
                  {predefinedScenarios.map((sc, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sc.prompt)}
                      className="w-full text-left p-3 rounded-xl bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] hover:border-[#CBD5E1] text-xs text-[#0A1128] transition-all shadow-sm"
                    >
                      <span className="font-bold text-[#0A1128] block mb-0.5">{sc.label}</span>
                      <span className="text-[11px] text-[#52667D] line-clamp-2">{sc.prompt}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status specs */}
              <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] text-[11px] space-y-2 shadow-sm">
                <div className="flex justify-between text-[#52667D]">
                  <span>Motor IA:</span>
                  <span className="text-[#0A1128] font-mono font-bold">Metrys Enterprise v2</span>
                </div>
                <div className="flex justify-between text-[#52667D]">
                  <span>Privacidade RAG:</span>
                  <span className="text-emerald-600 font-mono font-bold">100% Blindado</span>
                </div>
                <div className="flex justify-between text-[#52667D]">
                  <span>Integração CRM:</span>
                  <span className="text-[#0A1128] font-mono font-bold">Tempo Real</span>
                </div>
              </div>
            </div>

            {/* Human in the loop assistant photo */}
            <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] flex items-center gap-3 shadow-sm text-left">
              <img
                src="/images/consultant-advisor.jpg"
                alt="Consultora e copiloto Metrys"
                className="w-10 h-10 rounded-full object-cover border border-[#CBD5E1] flex-shrink-0"
              />
              <div>
                <span className="text-xs font-bold text-[#0A1128] block">Copiloto da sua Equipe</span>
                <span className="text-[10px] text-[#52667D] leading-tight block">
                  Apoia seus profissionais com respostas sob medida, sem improvisos.
                </span>
              </div>
            </div>
          </div>

          {/* Right Chat Terminal */}
          <div className="lg:col-span-8 flex flex-col h-[520px] bg-white">
            
            {/* Messages Viewport */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#FFFFFF]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[88%] ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      msg.sender === 'user'
                        ? 'bg-[#0A1128] text-white'
                        : 'bg-[#F1F5F9] text-[#1E2E4A] border border-[#CBD5E1]'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div className="space-y-1.5">
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#0A1128] text-white rounded-tr-none'
                          : 'bg-[#F8FAFC] text-[#0A1128] border border-[#E2E8F0] rounded-tl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Metadata badge */}
                    {msg.meta && (
                      <div className="flex items-center gap-2.5 text-[10px] font-mono text-[#52667D] px-1">
                        <span className="flex items-center gap-1 text-[#2A4365] font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {msg.meta.actionTaken}
                        </span>
                        <span>•</span>
                        <span>{msg.meta.latencyMs}ms</span>
                        <span>•</span>
                        <span>{msg.time}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#1E2E4A] border border-[#CBD5E1] flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] rounded-tl-none flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#1E2E4A] animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-[#1E2E4A] animate-bounce [animation-delay:0.15s]" />
                    <div className="w-2 h-2 rounded-full bg-[#1E2E4A] animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite uma dúvida ou cenário da sua empresa para testar..."
                  className="flex-1 bg-white border border-[#CBD5E1] focus:border-[#0A1128] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0A1128] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-3 rounded-xl bg-[#0A1128] hover:bg-[#1E2E4A] disabled:opacity-40 text-white font-bold transition-all shadow-sm active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
