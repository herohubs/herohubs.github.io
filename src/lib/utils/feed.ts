import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import mainConfig from '@/config/main-config.json';

type Post = CollectionEntry<'posts'>;

const baseName = (id: string) => id.split('/').pop();

// Published articles of a language, newest first. Unlike getSinglePage, drafts are left out in dev too.
export async function getFeedPosts(lang: string, filter: (post: Post) => boolean = () => true): Promise<Post[]> {
  const allPosts = await getCollection('posts');

  // An article is published only when every language variant is out of draft
  const draftBaseNames = new Set(allPosts.filter((post) => post.data.draft).map((post) => baseName(post.id)));

  return allPosts
    .filter((post) => post.id.startsWith(`${lang}/`))
    .filter((post) => !draftBaseNames.has(baseName(post.id)))
    .filter((post) => post.data.date)
    .filter(filter)
    .sort((a, b) => b.data.date!.getTime() - a.data.date!.getTime());
}

export function feedResponse(
  context: APIContext,
  { lang, title, description, posts }: { lang: string; title: string; description: string; posts: Post[] },
): Promise<Response> {
  return rss({
    title,
    description,
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
