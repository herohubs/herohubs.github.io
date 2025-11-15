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
  loading?: "eager" | "lazy" | null | undefined;
  decoding?: "async" | "auto" | "sync" | null | undefined;
  format?: "auto" | "avif" | "jpeg" | "png" | "svg" | "webp";
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
