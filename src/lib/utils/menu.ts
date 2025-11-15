import menuJson from '@/config/menu.json';
import type { INavigationLink } from '@/interfaces';

export function getMainMenu(): INavigationLink[] {
  const menu: { main: INavigationLink[] } = menuJson;

  return menu.main.filter((m) => {
    const isUiKit = m.url?.startsWith('/ui-kit');
    const isCategory = m.url?.startsWith('/categories/');
    const isBlog = m.isBlog === true;

    // UI Kit
    if (isUiKit) return import.meta.env.DEV;

    // Categories and blog
    if (isCategory || isBlog) return false;

    return true;
  });
}

export function getCategoryMenu(posts: any[]): INavigationLink[] {
  const menu: { main: INavigationLink[] } = menuJson;

  // Get 'blog' item from json
  const blogItem = menu.main.find((m) => m.isBlog === true);

  // Post categories
  const uniqueCategories: string[] = [...new Set(posts.flatMap((post: any) => post.data.categories))];

  const categoryItems = uniqueCategories.map((category: string) => ({
    name: category,
    url: `/categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
  }));

  return [...(blogItem ? [blogItem] : []), ...categoryItems];
}

export function getOtherFooterMenu(): INavigationLink[] {
  const menu: { other: INavigationLink[] } = menuJson;
  return menu.other;
}
