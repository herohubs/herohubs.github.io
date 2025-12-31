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
import { blogRedirects } from './redirect.config';

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

  redirects: blogRedirects,
});
