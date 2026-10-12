import type { FC } from 'react';

export const PartnerLogos: FC = () => {
  const partners = [
    'TOTVS',
    'RD STATION',
    'pipedrive',
    'make',
    'zapier',
    'WhatsApp',
    'Google Workspace',
    'aws',
    'Microsoft',
    'n8n',
  ];

  return (
    <section className="py-8 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Label on left */}
          <span className="text-xs font-semibold text-[#64748B] flex-shrink-0">
            Empresas e tecnologias integradas pela METRYS
          </span>

          {/* Logos Row on right */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 sm:gap-8 opacity-75">
            {partners.map((name) => (
              <span
                key={name}
                className="text-xs sm:text-sm font-bold text-[#1E2E4A] tracking-tight hover:opacity-100 transition-opacity"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
