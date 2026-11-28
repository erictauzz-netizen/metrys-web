import { ENTITY_CONFIG } from '../config/entity';
import type { RouteMeta } from '../config/routes';

export function generateSchemaGraph(route: RouteMeta) {
  const isHome = route.path === '/';

  const organizationEntity = {
    '@type': 'Organization',
    '@id': `${ENTITY_CONFIG.domain}/#organization`,
    name: ENTITY_CONFIG.legalName,
    alternateName: ENTITY_CONFIG.name,
    url: ENTITY_CONFIG.domain,
    logo: {
      '@type': 'ImageObject',
      '@id': `${ENTITY_CONFIG.domain}/#logo`,
      url: `${ENTITY_CONFIG.domain}/favicon-512x512.png`,
      width: 512,
      height: 512,
      caption: ENTITY_CONFIG.name,
    },
    description: ENTITY_CONFIG.description,
    email: ENTITY_CONFIG.email,
    areaServed: 'Brasil',
    knowsAbout: [
      'CRM B2B',
      'Inteligência Artificial Corporativa',
      'Automação de Processos',
      'Integrações ERP',
      'Desenvolvimento de Software',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: ENTITY_CONFIG.email,
        availableLanguage: ['Portuguese'],
        areaServed: 'BR',
      },
    ],
    sameAs: ENTITY_CONFIG.socials,
  };

  const webSiteEntity = {
    '@type': 'WebSite',
    '@id': `${ENTITY_CONFIG.domain}/#website`,
    url: ENTITY_CONFIG.domain,
    name: ENTITY_CONFIG.name,
    description: ENTITY_CONFIG.description,
    publisher: {
      '@id': `${ENTITY_CONFIG.domain}/#organization`,
    },
    inLanguage: 'pt-BR',
  };

  const breadcrumbsEntity = {
    '@type': 'BreadcrumbList',
    '@id': `${route.canonical}#breadcrumb`,
    itemListElement: route.breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  const webPageEntity = {
    '@type': 'WebPage',
    '@id': `${route.canonical}#webpage`,
    url: route.canonical,
    name: route.title,
    description: route.description,
    isPartOf: {
      '@id': `${ENTITY_CONFIG.domain}/#website`,
    },
    about: {
      '@id': `${ENTITY_CONFIG.domain}/#organization`,
    },
    breadcrumb: {
      '@id': `${route.canonical}#breadcrumb`,
    },
    inLanguage: 'pt-BR',
  };

  const entities: any[] = [organizationEntity, webSiteEntity, breadcrumbsEntity, webPageEntity];

  if (!isHome && route.solutionName) {
    if (route.schemaType === 'SoftwareApplication') {
      entities.push({
        '@type': 'SoftwareApplication',
        '@id': `${route.canonical}#software`,
        name: route.solutionName,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Cloud',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'BRL',
          availability: 'https://schema.org/InStock',
          description: 'Diagnóstico comercial e orçamento sob medida.',
        },
        provider: {
          '@id': `${ENTITY_CONFIG.domain}/#organization`,
        },
        description: route.answerFirst,
      });
    } else {
      entities.push({
        '@type': 'Service',
        '@id': `${route.canonical}#service`,
        name: route.solutionName,
        serviceType: route.solutionName,
        provider: {
          '@id': `${ENTITY_CONFIG.domain}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Brazil',
        },
        description: route.answerFirst,
      });
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': entities,
  };
}
