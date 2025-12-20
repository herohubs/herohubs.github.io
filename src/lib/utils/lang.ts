import mainConfig from '@/config/main-config.json';
import type { INavigationLink } from '@/interfaces';

export type Lang = string;

const {
  settings: { languages, default_language },
} = mainConfig;

export function resolveLang(lang?: string): Lang {
  if (lang && languages.includes(lang)) {
    return lang;
  }
  return default_language;
}

export async function loadLocalizedConfig<T>(lang: string | undefined, file: string): Promise<T> {
  const resolvedLang = resolveLang(lang);

  return import(`../../config/${resolvedLang}/${file}.json`).then((m) => m.default);
}

export { mainConfig };

export async function loadMenu(lang?: string): Promise<{ main: INavigationLink[]; other?: INavigationLink[] }> {
  const resolvedLang = resolveLang(lang);

  return import(`../../config/${resolvedLang}/menu.json`).then((m) => m.default);
}
