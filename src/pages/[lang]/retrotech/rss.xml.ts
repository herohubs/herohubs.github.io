import type { APIContext } from 'astro';
import mainConfig from '@/config/main-config.json';
import type { SiteConfig } from '@/interfaces';
import { getFeedPosts, feedResponse } from '@/lib/utils/feed';
import { loadLocalizedConfig } from '@/lib/utils/lang';
import type { SeriesId } from '@/lib/utils/series';

const series: SeriesId = 'retrotech';

export function getStaticPaths() {
  return mainConfig.settings.languages.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as string;
  const config = await loadLocalizedConfig<SiteConfig>(lang, 'config');
  const copy = config.series.items[series];

  return feedResponse(context, {
    lang,
    title: copy.feed_title,
    description: copy.meta_description,
    posts: await getFeedPosts(lang, (post) => post.data.series === series),
  });
}
