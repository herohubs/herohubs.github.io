import type { APIContext } from 'astro';
import mainConfig from '@/config/main-config.json';
import type { SiteConfig } from '@/interfaces';
import { getFeedPosts, feedResponse } from '@/lib/utils/feed';
import { loadLocalizedConfig } from '@/lib/utils/lang';

export function getStaticPaths() {
  return mainConfig.settings.languages.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as string;
  const config = await loadLocalizedConfig<SiteConfig>(lang, 'config');

  return feedResponse(context, {
    lang,
    title: config.site.title,
    description: config.metadata.meta_description,
    posts: await getFeedPosts(lang),
  });
}
