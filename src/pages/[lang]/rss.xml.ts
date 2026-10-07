import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import mainConfig from '@/config/main-config.json';
import { loadLocalizedConfig } from '@/lib/utils/lang';

export function getStaticPaths() {
  return mainConfig.settings.languages.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as string;
  const config: any = await loadLocalizedConfig(lang, 'config');
  const allPosts = await getCollection('posts');

  // An article is published only when every language variant is out of draft
  const baseName = (id: string) => id.split('/').pop();
  const draftBaseNames = new Set(allPosts.filter((post) => post.data.draft).map((post) => baseName(post.id)));
  const posts = allPosts
    .filter((post) => post.id.startsWith(`${lang}/`))
    .filter((post) => !draftBaseNames.has(baseName(post.id)))
    .filter((post) => post.data.date)
    .sort((a, b) => b.data.date!.getTime() - a.data.date!.getTime());

  return rss({
    title: config.site.title,
    description: config.metadata.meta_description,
    site: context.site ?? mainConfig.site.base_url,
    customData: `<language>${lang}</language>`,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${lang}/posts/${baseName(post.id)}`,
      categories: post.data.categories,
    })),
  });
}
