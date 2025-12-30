import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'astro-auto-import';
import { defineConfig } from 'astro/config';
import remarkCollapse from 'remark-collapse';
import remarkToc from 'remark-toc';
import sharp from 'sharp';
import mainConfig from './src/config/main-config.json';

let highlighter;
async function getHighlighter() {
  if (!highlighter) {
    const { getHighlighter } = await import('shiki');
    highlighter = await getHighlighter({ theme: 'one-dark-pro' });
  }
  return highlighter;
}

// https://astro.build/config
export default defineConfig({
  site: mainConfig.site.base_url ? mainConfig.site.base_url : 'http://examplesite.com',
  base: mainConfig.site.base_path ? mainConfig.site.base_path : '/',
  trailingSlash: mainConfig.site.trailing_slash ? 'always' : 'never',

  vite: { plugins: [tailwindcss()] },
  image: { service: sharp() },

  integrations: [
    react(),
    sitemap(),

    AutoImport({
      imports: [
        '@/shortcodes/Button',
        '@/shortcodes/Accordion',
        '@/shortcodes/Notice',
        '@/shortcodes/Video',
        '@/shortcodes/Youtube',
        '@/shortcodes/Tabs',
        '@/shortcodes/Tab',
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: 'Table of contents',
        },
      ],
    ],
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
    highlighter: getHighlighter,

    extendDefaultPlugins: true,
  },

  redirects: {
    '/2024/11/28/qa-il-pilastro-invisibile-dello-sviluppo-software': '/it/posts/1',
    '/2024/11/29/le-fallacie-dei-sistemi-distribuiti': '/it/posts/2',
    '/2024/12/02/le-organizzazioni-esponenziali-il-futuro-del-business-e-gia-qui': '/it/posts/3',
    '/2024/12/03/ai-la-rivoluzione-nello-sviluppo-software': '/it/posts/4',
    '/2024/12/04/linux-linvisibile-protagonista-del-mondo-digitale': '/it/posts/5',
    '/2024/12/06/aws-cloudflare-supabase-e-gli-altri-quale-scegliere': '/it/posts/6',
    '/2024/12/09/php-il-linguaggio-amato-odiato-frainteso': '/it/posts/7',
    '/2024/12/10/la-diversita-nei-team-tecnologici-come-background-differenti-portano-innovazione-e-creativita':
      '/it/posts/8',
    '/2024/12/12/la-trasformazione-digitale-nelle-pmi-un-passaggio-cruciale-per-il-futuro-del-business': '/it/posts/9',
    '/2024/12/13/microservizi-vs-monoliti-ha-ancora-senso-discuterne-nel-2024': '/it/posts/10',

    '/2024/12/17/come-pianificare-ed-eseguire-progetti-software-con-un-certo-successo': '/it/posts/11',
    '/2024/12/18/git-perche-il-trunk-based-development-sta-conquistando-lo-sviluppo-software': '/it/posts/12',
    '/2025/01/07/limportanza-delle-soft-skills': '/it/posts/13',
    '/2025/01/08/meeting-efficaci-come-farli-funzionare-davvero': '/it/posts/14',
    '/2025/01/09/il-triangolo-del-project-management': '/it/posts/15',
    '/2025/01/10/software-architecture-quale-usare': '/it/posts/16',
    '/2025/01/17/dati-decisioni-e-direzioni-il-ruolo-del-professionista-dei-dati': '/it/posts/17',
    '/2025/01/20/waterfall-vs-agile-due-approcci-a-confronto-nello-sviluppo-software': '/it/posts/18',
    '/2025/01/23/chatgpt-e-gli-altri-sostituira-veramente-i-developer': '/it/posts/19',
    '/2025/02/07/firebase-real-time-database-la-scelta-giusta-per-applicazioni-in-tempo-reale': '/it/posts/20',

    '/2025/02/10/linkedin-e-apache-kafka-7-trilioni-di-messaggi-al-giorno': '/it/posts/21',
    '/2025/02/13/perche-scegliere-una-standing-desk': '/it/posts/22',
    '/2025/02/17/limportanza-del-design-system-perche-ui-e-ux-non-sono-un-optional': '/it/posts/23',
    '/2025/02/24/perche-elon-musk-ha-acquistato-twitter-la-risposta-e-grok3': '/it/posts/24',
    '/2025/02/27/sst-il-futuro-del-serverless-su-aws': '/it/posts/25',
    '/2025/03/03/soluzioni-b2b-intelligenti-perche-integrare-lai-nel-tuo-progetto-software': '/it/posts/26',
    '/2025/03/12/6-modi-per-passare-parametri-a-una-rest-api-in-spring-boot-java': '/it/posts/27',
    '/2025/03/19/cookie-vs-local-storage-differenze-e-vantaggi': '/it/posts/28',
    '/2025/03/26/da-html-a-jsx-la-rivoluzione-silenziosa-del-web': '/it/posts/29',

    '/2025/04/03/manager-e-developer-oltre-la-superficialita-dei-social': '/it/posts/30',
    '/2025/04/04/importanza-di-avere-un-piano-di-crescita-professionale': '/it/posts/31',
    '/2025/04/10/agent-as-a-service-aaas-il-futuro-oltre-il-saas': '/it/posts/32',
    '/2025/04/24/hono-semplicita-e-potenza-per-applicazioni-web-moderne': '/it/posts/33',
    '/2025/05/02/scrivere-bene-una-competenza-cruciale-per-leader-e-developer': '/it/posts/34',
    '/2025/05/08/pull-e-merge-request-stessi-obiettivi-ma-approcci-diversi': '/it/posts/35',
    '/2025/05/15/htmx-lalleato-inatteso-del-backend-moderno': '/it/posts/36',
    '/2025/05/21/biome-la-toolchain-moderna-che-semplifica-lo-sviluppo-web': '/it/posts/37',
    '/2025/05/29/test-driven-development-un-alleato-silenzioso-per-costruire-software-di-qualita': '/it/posts/38',
    '/2025/06/05/astro-architettura-a-isole-e-rendering-ibrido-per-contenuti-e-performance': '/it/posts/39',
    '/2025/06/12/architetture-esagonali-una-nuova-prospettiva-grazie-a-ports-and-adapters': '/it/posts/40',

    '/2025/06/19/feature-flags-la-chiave-per-rilasci-sicuri-e-controllati': '/it/posts/41',
  },
});
