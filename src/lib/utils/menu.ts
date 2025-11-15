import menuJson from "@/config/menu.json";
import type { INavigationLink } from "@/interfaces";

export function getMainMenu(): INavigationLink[] {
  const menu: { main: INavigationLink[] } = menuJson;

  return menu.main.filter((m) => {
    const isUiKit = m.url?.startsWith("/ui-kit");
    const isCategory = m.url?.startsWith("/categories/");
    const isBlog = m.isBlog === true;

    // UI Kit
    if (isUiKit) return import.meta.env.DEV;

    // Categories and blog
    if (isCategory) return false;

    return true;
  });
}

export function getCategoryMenu(posts: any[]): INavigationLink[] {
  const uniqueCategories: string[] = [
    ...new Set(posts.flatMap((post: any) => post.data.categories)),
  ];

  return uniqueCategories.map((category: string) => ({
    name: category,
    url: `/categories/${category.toLowerCase().replace(/\s+/g, "-")}`,
  }));
}

export function getOtherFooterMenu(): INavigationLink[] {
  const menu: { other: INavigationLink[] } = menuJson;
  return menu.other;
}
