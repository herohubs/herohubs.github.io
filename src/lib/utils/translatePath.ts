import { getSinglePage } from '@/lib/contentParser.astro';
import { categorySegment, mainConfig } from '@/lib/utils/lang';
import { slugify } from '@/lib/utils/textConverter';

const { languages } = mainConfig.settings;
const segments = [...new Set(languages.map(categorySegment))].join('|');
const categoryPath = new RegExp(`^/(${languages.join('|')})/(?:${segments})/([^/]+)(/?)$`);

// Both language versions of an article share the file name and map to the same category row,
// so pairing their categories by position gives the slug of each category in the other language.
// getSinglePage applies the same draft rules as the category pages, so the target always exists.
async function categorySlug(slug: string, sourceLang: string, targetLang: string): Promise<string | undefined> {
  const [sourcePosts, targetPosts] = await Promise.all([
    getSinglePage('posts', sourceLang),
    getSinglePage('posts', targetLang),
  ]);
  const fileName = (id: string) => id.split('/').pop();
  const targetByFile = new Map(targetPosts.map((post) => [fileName(post.id), post.data.categories.map(slugify)]));

  for (const post of sourcePosts) {
    const index = post.data.categories.map(slugify).indexOf(slug);
    const translated = targetByFile.get(fileName(post.id))?.[index];
    if (index !== -1 && translated) return translated;
  }
}

// Returns the path of the current page in the target language, falling back to its home page
// when a category has no counterpart
export async function translatePath(pathname: string, targetLang: string): Promise<string> {
  const category = pathname.match(categoryPath);
  if (category) {
    const [, sourceLang, slug, trailingSlash] = category;
    const translated = await categorySlug(slug, sourceLang, targetLang);
    return translated
      ? `/${targetLang}/${categorySegment(targetLang)}/${translated}${trailingSlash}`
      : `/${targetLang}`;
  }

  return pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${targetLang}`);
}
