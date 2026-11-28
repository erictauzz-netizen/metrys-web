import { renderToString } from 'react-dom/server';
import App from './App';
import { ROUTES } from './config/routes';
import { generateSchemaGraph } from './lib/schema';
import { ENTITY_CONFIG } from './config/entity';

export function render(url: string) {
  const cleanUrl = url.replace(/\/$/, '') || '/';
  const meta = ROUTES[cleanUrl] || {
    path: cleanUrl,
    title: 'Página Não Encontrada | METRYS Tecnologia',
    description: 'A página solicitada não foi localizada no ecossistema METRYS.',
    canonical: `${ENTITY_CONFIG.domain}${cleanUrl}`,
    h1: 'Página Não Encontrada',
    badge: 'ERRO 404',
    answerFirst: '',
    datePublished: '2026-11-28',
    dateModified: '2026-11-28',
    schemaType: 'Service' as const,
    breadcrumbs: [{ name: 'Início', url: `${ENTITY_CONFIG.domain}/` }],
    features: [],
    sla: '',
  };

  const appHtml = renderToString(<App initialPath={cleanUrl} />);
  const schema = generateSchemaGraph(meta);

  return {
    appHtml,
    meta,
    schemaJson: JSON.stringify(schema),
  };
}
