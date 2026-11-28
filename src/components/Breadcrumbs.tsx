import type { FC } from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-xs text-[#475569] font-medium">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((crumb, idx) => {
          const isLast = idx === items.length - 1;
          const href = crumb.url.startsWith('https://metrys.com.br')
            ? crumb.url.replace('https://metrys.com.br', '') || '/'
            : crumb.url;

          return (
            <li key={crumb.url} className="flex items-center gap-2">
              {idx > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-[#64748B]" aria-hidden="true" />
              )}
              {isLast ? (
                <span className="text-[#0A1128] font-bold" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <a href={href} className="hover:text-[#0A1128] underline-offset-2 hover:underline transition-colors">
                  {crumb.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
