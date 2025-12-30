export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

export type Pagination = {
  section?: string;
  currentPage?: number;
  totalPages?: number;
};

export {};
declare global {
  interface Window {
    initGA?: () => void;
  }
}
