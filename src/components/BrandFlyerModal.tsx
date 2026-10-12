import type { FC } from 'react';
import { X, Palette, Sparkles } from 'lucide-react';
import { MetrysLogo } from './MetrysLogo';

interface BrandFlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandFlyerModal: FC<BrandFlyerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const colorPalette = [
    { name: 'Dark Navy', hex: '#0A1128', role: 'Tipografia Principal & Contrastes' },
    { name: 'Slate Blue', hex: '#2A4365', role: 'Títulos Secundários & Acentos' },
    { name: 'Muted Steel', hex: '#6B82A0', role: 'Subtítulos & Taglines' },
    { name: 'Ice Grey', hex: '#D5DFEB', role: 'Bordas, Divisores & Cards' },
    { name: 'Pure White', hex: '#FFFFFF', role: 'Fundo Master da Marca' },
    { name: 'Metrys Yellow', hex: '#FACC15', role: 'Barra Vertical de Destaque' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-[#CBD5E1] shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#52667D] hover:text-[#0A1128] bg-[#F1F5F9] border border-[#CBD5E1] transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-5">
          <MetrysLogo size="sm" showTagline={false} />
          <div>
            <h3 className="text-xl font-black text-[#0A1128]">
              Identidade Visual & Diretrizes Oficiais
            </h3>
            <span className="text-xs text-[#52667D] font-mono">
              Fidelidade ao material original enviado
            </span>
          </div>
        </div>

        {/* Image Preview & Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-6 items-center">
          
          <div className="md:col-span-7 space-y-3">
            <span className="text-xs font-mono font-bold text-[#0A1128] uppercase tracking-wider block">
              Flyer Oficial Fornecido:
            </span>
            <div className="rounded-xl overflow-hidden border border-[#CBD5E1] shadow-card bg-[#F8FAFC]">
              <img
                src="/metrys-brand.png"
                alt="Flyer Oficial Metrys"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0A1128] uppercase tracking-wider">
              <Palette className="w-4 h-4 text-[#FACC15]" />
              Paleta Extraída e Mapeada
            </div>

            <div className="space-y-2">
              {colorPalette.map((color, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-md border border-[#CBD5E1] shadow-sm flex-shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <span className="font-bold text-[#0A1128] block">{color.name}</span>
                      <span className="text-[10px] text-[#52667D]">{color.role}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-[#0A1128] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                    {color.hex}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#334155] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#0A1128]">
                <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
                <span>Os 4 Pilares da Metrys:</span>
              </div>
              <p className="text-[11px] text-[#52667D] leading-relaxed">
                1. <strong>METRYS CRM</strong> (Gestão comercial)<br />
                2. <strong>METRYS AI</strong> (Agentes inteligentes)<br />
                3. <strong>METRYS FLOW</strong> (Automações e integrações)<br />
                4. <strong>METRYS SYSTEMS</strong> (Desenvolvimento de sistemas)
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#E2E8F0] pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0A1128] hover:bg-[#1E2E4A] transition-all"
          >
            Fechar e Continuar
          </button>
        </div>

      </div>
    </div>
  );
};
