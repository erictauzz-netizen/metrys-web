import type { FC } from 'react';

interface MetrysLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
}

export const MetrysLogo: FC<MetrysLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  showTagline = true,
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-xl', tag: 'text-[8.5px]' },
    md: { icon: 'w-11 h-11', text: 'text-2xl sm:text-3xl', tag: 'text-[9.5px]' },
    lg: { icon: 'w-16 h-16', text: 'text-4xl', tag: 'text-xs' },
    xl: { icon: 'w-24 h-24', text: 'text-6xl', tag: 'text-sm' },
  };

  const { icon, text, tag } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Geometric Faceted Origami "M" Logo */}
      <div className={`relative ${icon} flex-shrink-0 transition-transform duration-200`}>
        <svg
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="facet-left-soft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#647E9A" />
              <stop offset="100%" stopColor="#2A4365" />
            </linearGradient>
            <linearGradient id="facet-center-dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E2E4A" />
              <stop offset="100%" stopColor="#0A1128" />
            </linearGradient>
            <linearGradient id="facet-right-navy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#324B6E" />
              <stop offset="100%" stopColor="#111D38" />
            </linearGradient>
          </defs>

          {/* Left Wing Facet */}
          <polygon
            points="14,88 38,12 55,56 36,88"
            fill="url(#facet-left-soft)"
          />

          {/* Center Valley Fold */}
          <polygon
            points="38,12 60,60 82,12 60,36"
            fill="url(#facet-center-dark)"
          />

          {/* Right Wing Facet */}
          <polygon
            points="82,12 106,88 84,88 65,56"
            fill="url(#facet-right-navy)"
          />

          {/* Crisp highlight edge */}
          <polyline
            points="14,88 38,12 60,60 82,12 106,88"
            stroke="#9FB2C8"
            strokeWidth="0.8"
            strokeOpacity="0.4"
            fill="none"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col justify-center text-left">
          <div className="flex items-center gap-2">
            <span
              className={`font-black tracking-[0.24em] text-[#0A1128] ${text} leading-none font-sans`}
            >
              METRYS
            </span>
          </div>
          {showTagline && (
            <span
              className={`font-bold tracking-[0.22em] text-[#52667D] uppercase ${tag} leading-tight mt-1`}
            >
              TECNOLOGIA QUE MOVE NEGÓCIOS
            </span>
          )}
        </div>
      )}
    </div>
  );
};
