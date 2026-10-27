import mainConfig from '@/config/main-config.json';
import { resolveLang } from '@/lib/utils/lang';

// A series runs across categories: an article keeps its own category and may also belong to one series.
// Adding a series means adding its id here, its copy under `series.items` in each localized config.json
// and the two route files under src/pages/[lang]/<id>/.
export const seriesIds = ['retrotech'] as const;

export type SeriesId = (typeof seriesIds)[number];

export function seriesPath(lang: string | undefined, id: SeriesId): string {
  return `/${resolveLang(lang)}/${id}`;
}

export function seriesFeedPath(lang: string | undefined, id: SeriesId): string {
  return `${seriesPath(lang, id)}/rss.xml`;
}

// Absolute URLs of the series page in every language, plus x-default on the default language
export function seriesAlternates(id: SeriesId): { hreflang: string; href: string }[] {
  const { base_url } = mainConfig.site;
  const { languages, default_language } = mainConfig.settings;

  return [
    ...languages.map((lang) => ({ hreflang: lang, href: `${base_url}${seriesPath(lang, id)}` })),
    { hreflang: 'x-default', href: `${base_url}${seriesPath(default_language, id)}` },
  ];
}

export function filterBySeries<T extends { data: { series?: SeriesId } }>(posts: T[], id: SeriesId): T[] {
  return posts.filter((post) => post.data.series === id);
}
