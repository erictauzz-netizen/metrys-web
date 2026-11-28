import { useState, useEffect, useRef, useCallback, type FC, type FormEvent } from 'react';
import { toast } from 'sonner';
import { getAttributionData, sendGaEvent, trackWhatsAppClick } from '../lib/attribution';
import {
  Send,
  Phone,
  Mail,
  Building2,
  User,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';

interface ContactSectionProps {
  initialNotes?: string;
  pillarInterest?: string;
}

interface PendingLeadPayload {
  nome: string;
  telefone: string;
  email?: string;
  empresa?: string;
  mensagem?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  initial_referrer?: string;
  pillar_interest?: string;
  website_url_confirm?: string;
}

interface PendingLeadRecord {
  id: string;
  payload: PendingLeadPayload;
  createdAt: string;
  attempts: number;
  lastError: string | null;
}

type PostLeadOutcome =
  | { status: 'ok'; leadId: string }
  | { status: 'validation_error'; message: string }
  | { status: 'retryable_error'; message: string };

const PENDING_LEAD_STORAGE_KEY = 'metrys_pending_lead_v1';
const CLIENT_SUBMIT_TIMEOUT_MS = 15000;
const AUTO_RETRY_INTERVAL_MS = 15000;
const FOCUS_RETRY_COOLDOWN_MS = 3000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FALLBACK_WHATSAPP = ((import.meta.env.VITE_METRYS_FALLBACK_WHATSAPP as string | undefined) || '').trim();
const FALLBACK_EMAIL = ((import.meta.env.VITE_METRYS_FALLBACK_EMAIL as string | undefined) || '').trim();

function readPendingLead(): PendingLeadRecord | null {
  try {
    const raw = window.localStorage.getItem(PENDING_LEAD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PendingLeadRecord>;
    if (
      !parsed ||
      typeof parsed.id !== 'string' ||
      !parsed.id ||
      !parsed.payload ||
      typeof parsed.payload !== 'object'
    ) {
      return null;
    }
    const nome = typeof parsed.payload.nome === 'string' ? parsed.payload.nome.trim() : '';
    const telefone = typeof parsed.payload.telefone === 'string' ? parsed.payload.telefone.trim() : '';
    const email = typeof parsed.payload.email === 'string' ? parsed.payload.email.trim() : '';
    if (!nome && !telefone && !email) return null;
    return {
      id: parsed.id,
      payload: parsed.payload as PendingLeadPayload,
      createdAt: typeof parsed.createdAt === 'string' ? parsed.createdAt : new Date().toISOString(),
      attempts: typeof parsed.attempts === 'number' && Number.isFinite(parsed.attempts) ? parsed.attempts : 0,
      lastError: typeof parsed.lastError === 'string' ? parsed.lastError : null,
    };
  } catch {
    return null;
  }
}

function writePendingLead(record: PendingLeadRecord): void {
  try {
    window.localStorage.setItem(PENDING_LEAD_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Ignore storage quota or private-mode restrictions
  }
}

function clearPendingLead(): void {
  try {
    window.localStorage.removeItem(PENDING_LEAD_STORAGE_KEY);
  } catch {
    // Ignore storage restrictions
  }
}

function createLeadId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function formatLeadSummary(record: PendingLeadRecord): string {
  const lines = [
    `Protocolo local: ${record.id}`,
    `Nome: ${record.payload.nome || '-'}`,
    `Telefone/WhatsApp: ${record.payload.telefone || '-'}`,
  ];
  if (record.payload.email) lines.push(`E-mail: ${record.payload.email}`);
  if (record.payload.empresa) lines.push(`Empresa: ${record.payload.empresa}`);
  if (record.payload.mensagem) lines.push(`Necessidade: ${record.payload.mensagem}`);
  return lines.join('\n');
}

async function postLeadToApi(record: PendingLeadRecord): Promise<PostLeadOutcome> {
  const webhookUrl =
    (import.meta.env.VITE_METRYS_CRM_WEBHOOK_URL as string | undefined) || '/api/lead';

  const bodyParams = new URLSearchParams();
  bodyParams.set('external_id', record.id);
  bodyParams.set('nome', record.payload.nome);
  bodyParams.set('telefone', record.payload.telefone);
  if (record.payload.email) bodyParams.set('email', record.payload.email);
  if (record.payload.empresa) bodyParams.set('empresa', record.payload.empresa);
  if (record.payload.mensagem) bodyParams.set('mensagem', record.payload.mensagem);
  if (record.payload.landing_page) bodyParams.set('landing_page', record.payload.landing_page);
  if (record.payload.initial_referrer) bodyParams.set('initial_referrer', record.payload.initial_referrer);
  if (record.payload.pillar_interest) bodyParams.set('pillar_interest', record.payload.pillar_interest);
  if (record.payload.website_url_confirm) bodyParams.set('website_url_confirm', record.payload.website_url_confirm);

  for (const utmKey of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const) {
    const val = record.payload[utmKey];
    if (val) bodyParams.set(utmKey, val);
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), CLIENT_SUBMIT_TIMEOUT_MS);

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: bodyParams.toString(),
      signal: controller.signal,
    });

    const payloadResult = await res.json().catch(() => null);

    if (res.ok && payloadResult?.data?.lead_id) {
      return { status: 'ok', leadId: String(payloadResult.data.lead_id) };
    }

    if ((res.status === 400 || res.status === 422) && payloadResult?.retryable !== true) {
      return {
        status: 'validation_error',
        message:
          typeof payloadResult?.error === 'string' && payloadResult.error
            ? payloadResult.error
            : 'Verifique os dados informados e tente novamente.',
      };
    }

    return {
      status: 'retryable_error',
      message:
        typeof payloadResult?.error === 'string' && payloadResult.error
          ? payloadResult.error
          : `Falha temporária ao conectar com o CRM (HTTP ${res.status})`,
    };
  } catch (err) {
    const message =
      err instanceof Error && err.name === 'AbortError'
        ? 'Tempo limite excedido ao conectar com o CRM'
        : 'Falha de conexão com o servidor';
    return {
      status: 'retryable_error',
      message,
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export const ContactSection: FC<ContactSectionProps> = ({
  initialNotes = '',
  pillarInterest,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pendingLead, setPendingLead] = useState<PendingLeadRecord | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const isFlushingRef = useRef(false);
  const lastAttemptAtRef = useRef(0);

  useEffect(() => {
    if (initialNotes) {
      setNotes((prev) => prev || initialNotes);
    }
  }, [initialNotes]);

  const triggerSuccessUx = useCallback((leadName: string, wasAutoFlush: boolean) => {
    clearPendingLead();
    setPendingLead(null);
    setName((prev) => prev || leadName);
    setIsSubmitting(false);
    setIsRetrying(false);
    setSubmitted(true);
    sendGaEvent('generate_lead', {
      event_category: 'lead',
      event_label: 'formulario_contato',
    });
    void import('canvas-confetti')
      .then(({ default: confetti }) => {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0A1128', '#2A4365', '#1E2E4A', '#6B82A0', '#CBD7E5'],
        });
      })
      .catch(() => {
        // Ignora caso confetti falhe em rede restrita
      });
    toast.success(
      wasAutoFlush
        ? 'Solicitação confirmada e enviada ao CRM! Um consultor entrará em contato em breve.'
        : 'Solicitação enviada com sucesso! Um consultor entrará em contato em breve.',
      { duration: 5000 }
    );
  }, []);

  const attemptSend = useCallback(
    async (
      record: PendingLeadRecord,
      options: { silentOnRetryableError: boolean; source: 'submit' | 'manual' | 'auto' }
    ) => {
      if (isFlushingRef.current) return;

      isFlushingRef.current = true;
      lastAttemptAtRef.current = Date.now();
      if (options.source === 'submit') {
        setIsSubmitting(true);
      } else {
        setIsRetrying(true);
      }

      writePendingLead(record);

      try {
        const result = await postLeadToApi(record);

        if (result.status === 'ok') {
          triggerSuccessUx(record.payload.nome, options.source === 'auto');
          return;
        }

        if (result.status === 'validation_error') {
          clearPendingLead();
          setPendingLead(null);
          toast.error(result.message);
          return;
        }

        const updatedRecord: PendingLeadRecord = {
          ...record,
          attempts: record.attempts + 1,
          lastError: result.message,
        };
        writePendingLead(updatedRecord);
        setPendingLead(updatedRecord);

        if (!options.silentOnRetryableError) {
          toast.error(
            'Instabilidade temporária ao enviar. Seus dados foram salvos localmente para reenvio automático.'
          );
        }
      } finally {
        isFlushingRef.current = false;
        setIsSubmitting(false);
        setIsRetrying(false);
      }
    },
    [triggerSuccessUx]
  );

  useEffect(() => {
    const saved = readPendingLead();
    if (!saved) return;

    setPendingLead(saved);
    setName((prev) => prev || saved.payload.nome || '');
    setPhone((prev) => prev || saved.payload.telefone || '');
    setEmail((prev) => prev || saved.payload.email || '');
    setCompany((prev) => prev || saved.payload.empresa || '');
    if (saved.payload.mensagem) {
      setNotes(saved.payload.mensagem);
    }

    if (typeof navigator === 'undefined' || navigator.onLine !== false) {
      void attemptSend(saved, { silentOnRetryableError: true, source: 'auto' });
    }
  }, [attemptSend]);

  useEffect(() => {
    if (!pendingLead || submitted) return;

    const tryFlush = (respectCooldown: boolean) => {
      if (isFlushingRef.current) return;
      if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
      if (respectCooldown && Date.now() - lastAttemptAtRef.current < FOCUS_RETRY_COOLDOWN_MS) {
        return;
      }
      const latest = readPendingLead() || pendingLead;
      if (!latest) return;
      void attemptSend(latest, { silentOnRetryableError: true, source: 'auto' });
    };

    const handleOnline = () => tryFlush(false);
    const handleFocus = () => tryFlush(true);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        tryFlush(true);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);
    const intervalId = window.setInterval(() => tryFlush(false), AUTO_RETRY_INTERVAL_MS);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.clearInterval(intervalId);
    };
  }, [pendingLead, submitted, attemptSend]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast.error('Por favor, preencha seu Nome e Telefone/WhatsApp para continuarmos.');
      return;
    }

    if (email.trim() && !EMAIL_REGEX.test(email.trim())) {
      toast.error('O e-mail informado não é válido. Verifique e tente novamente.');
      return;
    }

    const attribution = getAttributionData();
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const resolvedPillar = pillarInterest || attribution.pillar_interest;
    const payload: PendingLeadPayload = {
      nome: name.trim(),
      telefone: phone.trim(),
      ...(email.trim() ? { email: email.trim() } : {}),
      ...(company.trim() ? { empresa: company.trim() } : {}),
      ...(notes.trim() ? { mensagem: notes.trim() } : {}),
      landing_page: attribution.landing_page,
      initial_referrer: attribution.initial_referrer,
      ...(resolvedPillar ? { pillar_interest: resolvedPillar } : {}),
      ...(honeypot.trim() ? { website_url_confirm: honeypot.trim() } : {}),
    };

    for (const utmKey of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const) {
      const val = searchParams.get(utmKey) || attribution[utmKey];
      if (val) payload[utmKey] = val;
    }

    const record: PendingLeadRecord = {
      id: pendingLead?.id || createLeadId(),
      payload,
      createdAt: pendingLead?.createdAt || new Date().toISOString(),
      attempts: pendingLead?.attempts || 0,
      lastError: null,
    };

    await attemptSend(record, { silentOnRetryableError: false, source: 'submit' });
  };

  const handleCopySummary = async () => {
    if (!pendingLead) return;
    const summary = formatLeadSummary(pendingLead);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(summary);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = summary;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedSummary(true);
      toast.success('Resumo dos dados copiado para a área de transferência.');
      window.setTimeout(() => setCopiedSummary(false), 3000);
    } catch {
      toast.error('Não foi possível copiar automaticamente. Seus dados continuam salvos no formulário.');
    }
  };

  const whatsappDigits = FALLBACK_WHATSAPP.replace(/\D/g, '');
  const directWhatsAppHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
        'Olá, equipe METRYS! Gostaria de falar com um especialista sobre as soluções corporativas.'
      )}`
    : null;
  const fallbackWhatsAppHref =
    pendingLead && whatsappDigits
      ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
          `Olá, equipe METRYS! Gostaria de agendar uma demonstração.\n\n${formatLeadSummary(pendingLead)}`
        )}`
      : null;

  const fallbackEmailHref =
    pendingLead && FALLBACK_EMAIL
      ? `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
          `Solicitação de Demonstração — ${pendingLead.payload.empresa || pendingLead.payload.nome}`
        )}&body=${encodeURIComponent(formatLeadSummary(pendingLead))}`
      : null;

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
                <picture>
                  <source srcSet="/images/business-handshake.webp" type="image/webp" />
                  <img
                    src="/images/business-handshake.jpg"
                    alt="Aperto de mão corporativo e alinhamento de diretoria"
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />
                </picture>
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
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
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

              {directWhatsAppHref && (
                <a
                  href={directWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick(
                      typeof window !== 'undefined' ? window.location.pathname || '/' : '/',
                      pillarInterest || getAttributionData().pillar_interest || 'geral'
                    )
                  }
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0A1128] hover:bg-[#1E2E4A] text-white border border-[#0A1128] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 text-emerald-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#CBD7E5] block">Canal Direto Comercial</span>
                      <span className="text-sm font-bold text-white">Falar via WhatsApp Corporativo</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#CBD7E5]" />
                </a>
              )}
            </div>
          </div>

          {/* Right Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div id="formulario" className="rounded-2xl bg-[#F8FAFC] p-5 sm:p-10 border border-[#CBD5E1] shadow-card scroll-mt-24">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <h3 className="text-xl font-black text-[#0A1128] border-b border-[#E2E8F0] pb-3">
                    Solicitar Demonstração
                  </h3>

                  {pendingLead !== null && (
                    <div
                      data-testid="lead-recovery-banner"
                      role="status"
                      aria-live="polite"
                      className="rounded-xl border border-amber-300 bg-amber-50/90 p-4 text-left space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-[#0A1128]">
                            Solicitação salva localmente — reenvio automático ativo
                          </p>
                          <p className="text-xs text-[#52667D] leading-relaxed">
                            Houve uma instabilidade temporária ao conectar com nosso servidor. Seus dados não foram perdidos e serão reenviados automaticamente assim que a conexão estabilizar.
                          </p>
                          <p className="text-[11px] font-medium text-amber-900">
                            Tentativas registradas: {pendingLead.attempts}
                            {isRetrying ? ' • Tentando reenviar agora...' : ''}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          type="button"
                          disabled={isSubmitting || isRetrying}
                          onClick={() =>
                            void attemptSend(pendingLead, {
                              silentOnRetryableError: false,
                              source: 'manual',
                            })
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-[#0A1128] hover:bg-[#1E2E4A] disabled:opacity-60 transition-all"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
                          Tentar reenviar agora
                        </button>

                        <button
                          type="button"
                          onClick={() => void handleCopySummary()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#0A1128] bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] transition-all"
                        >
                          {copiedSummary ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              Resumo copiado
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copiar resumo dos dados
                            </>
                          )}
                        </button>

                        {fallbackWhatsAppHref && (
                          <a
                            href={fallbackWhatsAppHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackWhatsAppClick(
                                typeof window !== 'undefined' ? window.location.pathname || '/' : '/',
                                pendingLead?.payload?.pillar_interest || pillarInterest || getAttributionData().pillar_interest || 'geral'
                              )
                            }
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#0A1128] bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Enviar via WhatsApp
                          </a>
                        )}

                        {fallbackEmailHref && (
                          <a
                            href={fallbackEmailHref}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#0A1128] bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] transition-all"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            Enviar por e-mail
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Honeypot Anti-Spam invisível */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_url_confirm">Não preencha se for humano</label>
                    <input
                      type="text"
                      id="website_url_confirm"
                      name="website_url_confirm"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lead-name" className="block text-xs font-bold text-[#0A1128] mb-1.5">
                        Nome *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                        <input
                          id="lead-name"
                          name="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ex: Roberto Silva"
                          className="w-full bg-white border border-[#CBD5E1] focus:border-transparent focus:ring-2 focus:ring-[#0A1128] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0A1128] placeholder-[#64748B] focus:outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lead-phone" className="block text-xs font-bold text-[#0A1128] mb-1.5">
                        Telefone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                        <input
                          id="lead-phone"
                          name="phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="DDD + Seu WhatsApp ou Telefone"
                          className="w-full bg-white border border-[#CBD5E1] focus:border-transparent focus:ring-2 focus:ring-[#0A1128] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0A1128] placeholder-[#64748B] focus:outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lead-email" className="block text-xs font-bold text-[#0A1128] mb-1.5">
                        E-mail <span className="text-[#64748B] font-normal">(opcional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                        <input
                          id="lead-email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="roberto@suaempresa.com"
                          className="w-full bg-white border border-[#CBD5E1] focus:border-transparent focus:ring-2 focus:ring-[#0A1128] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0A1128] placeholder-[#64748B] focus:outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lead-company" className="block text-xs font-bold text-[#0A1128] mb-1.5">
                        Nome da empresa <span className="text-[#64748B] font-normal">(opcional)</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                        <input
                          id="lead-company"
                          name="company"
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Nome da sua empresa"
                          className="w-full bg-white border border-[#CBD5E1] focus:border-transparent focus:ring-2 focus:ring-[#0A1128] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0A1128] placeholder-[#64748B] focus:outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Open Needs Description Textarea */}
                  <div>
                    <label htmlFor="lead-notes" className="block text-xs font-bold text-[#0A1128] mb-1.5">
                      Descreva o que você precisa <span className="text-[#64748B] font-normal">(opcional)</span>
                    </label>
                    <textarea
                      id="lead-notes"
                      name="notes"
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex: Gostaria de integrar nosso atendimento WhatsApp com o funil comercial e automatizar emissão de contratos e notas fiscais."
                      className="w-full bg-white border border-[#CBD5E1] focus:border-transparent focus:ring-2 focus:ring-[#0A1128] rounded-xl p-3 text-sm text-[#0A1128] placeholder-[#64748B] focus:outline-none transition-all shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-[#0A1128] hover:bg-[#1E2E4A] transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
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
