import type { FC } from 'react';

const partners = [
  'TOTVS', 'RD Station', 'Pipedrive', 'Make', 'Zapier',
  'WhatsApp Business', 'Google Workspace', 'AWS', 'Microsoft 365',
  'n8n', 'HubSpot', 'Bling', 'Omie', 'SAP',
];

// Duplicate list for seamless infinite loop
const ticker = [...partners, ...partners];

export const PartnerLogos: FC = () => {
  return (
    <section className="py-7 bg-white border-b border-[#E2E8F0] overflow-hidden">
      <div className="max-w-[1520px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 mb-4">
        <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest text-center">
          Tecnologias e plataformas integradas pela METRYS
        </p>
      </div>

      {/* Infinite scroll marquee */}
      <div className="relative flex overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <div
          className="flex gap-10 items-center animate-marquee whitespace-nowrap"
          style={{ animation: 'marquee 28s linear infinite' }}
        >
          {ticker.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-xs sm:text-sm font-bold text-[#1E2E4A] tracking-tight opacity-50 hover:opacity-100 transition-opacity flex-shrink-0 px-2"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
