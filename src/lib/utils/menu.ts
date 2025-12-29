import type { INavigationLink } from '@/interfaces';
import { resolveLang, loadMenu } from '@/lib/utils/lang';

export async function getMainMenu(lang?: string): Promise<INavigationLink[]> {
  const menu = await loadMenu(lang);

  return menu.main.filter((m: any) => {
    const isUiKit = m.url?.includes('/ui-kit');
    const isCategory = m.url?.startsWith('/categories/');
    const isBlog = m.isBlog === true;

    if (isUiKit) return import.meta.env.DEV;
    if (isCategory || isBlog) return false;
    return true;
  });
}

export async function getCategoryMenu(posts: any[], lang?: string): Promise<INavigationLink[]> {
  const menu = await loadMenu(lang);

  const blogItem = menu.main.find((m) => m.isBlog === true);

  const uniqueCategories: string[] = [...new Set(posts.flatMap((post: any) => post.data.categories))];

  const resolvedLang = resolveLang(lang);

  const categoryItems = uniqueCategories.map((category: string) => ({
    name: category,
    url: `/${resolvedLang}/categories/${category.toLowerCase()}`,
  }));

  return [...(blogItem ? [blogItem] : []), ...categoryItems];
}

export async function getOtherFooterMenu(lang?: string): Promise<INavigationLink[]> {
  const menu = await loadMenu(lang);
  return menu.other ?? [];
}
