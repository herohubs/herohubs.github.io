interface IChildNavigationLink {
  name: string;
  url: string;
}

interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
  isBlog?: boolean;
}

export interface Props {
  title?: string;
  meta_title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  canonical?: string;
}

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: 'eager' | 'lazy' | null | undefined;
  decoding?: 'async' | 'auto' | 'sync' | null | undefined;
  format?: 'auto' | 'avif' | 'jpeg' | 'png' | 'svg' | 'webp';
  class?: string;
  style?: any;
}

interface ISocial {
  show?: boolean;
  [x: string]: any;
  name: string;
  icon: string;
  link: string;
}

interface IEducation {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

interface IDynamicIcon extends React.SVGProps<SVGSVGElement> {
  icon: string;
  className?: string;
}

export type MenuData = {
  main: INavigationLink[];
  other: INavigationLink[];
};

export type HomeData = {
  hero: HeroSection;
  about: AboutSection;
  customers: CustomersSection;
  blog: BlogSection;
  principles: PrinciplesSection;
};
interface HeroSection {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleMiddle: string;
  titleHighlight: string;
  titleEnd: string;
  text: string;
  primaryCta: string;
  secondaryCta: string;
  featuredLabel: string;
}
interface AboutSection {
  eyebrow: string;
  title: string;
  text1: string;
  text2: string;
  facts: { label: string; value: string }[];
  profileLabel: string;
}
interface CustomerItem {
  name: string;
  image: string;
  url: string;
}
interface CustomersSection {
  eyebrow: string;
  subtitle: string;
  text: string;
  items: CustomerItem[];
}
interface BlogSection {
  eyebrow: string;
  subtitle: string;
  text: string;
  allPosts: string;
}
interface PrinciplesSection {
  eyebrow: string;
  title: string;
  text: string;
  items: { title: string; text: string }[];
}
