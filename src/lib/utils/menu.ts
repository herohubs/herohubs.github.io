import menuJson from '@/config/menu.json';
import type { INavigationLink } from '@/interfaces';
import config from '@/config/config.json';

export function getMainMenu(): INavigationLink[] {
  const menu: { main: INavigationLink[] } = menuJson;

  return menu.main.filter((m) => {
    const isUiKit = m.url?.startsWith('/ui-kit');
    const isCategory = m.url?.startsWith('/categories/');
    const isBlog = m.isBlog === true;

    if (isUiKit) return import.meta.env.DEV;
    if (isCategory || isBlog) return false;
    return true;
  });
}

export function getCategoryMenu(posts: any[], lang: string = config.settings.default_language): INavigationLink[] {
  const menu: { main: INavigationLink[] } = menuJson;

  const blogItem = menu.main.find((m) => m.isBlog === true);

  const uniqueCategories: string[] = [...new Set(posts.flatMap((post: any) => post.data.categories))];

  const categoryItems = uniqueCategories.map((category: string) => ({
    name: category,
    url: `/${lang}/categories/${category.toLowerCase()}`,
  }));

  return [...(blogItem ? [blogItem] : []), ...categoryItems];
}

export function getOtherFooterMenu(): INavigationLink[] {
  const menu: { other: INavigationLink[] } = menuJson;
  return menu.other;
}
