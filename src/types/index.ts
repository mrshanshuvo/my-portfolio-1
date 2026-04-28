import { IconType } from "react-icons";

export interface Project {
  title: string;
  slug: string;
  description: string;
  image: string;
  technologies: IconType[];
  techNames: string[];
  github: string;
  live: string;
  featured: boolean;
  category: string;
  improvements: string[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SocialLink {
  icon: IconType;
  href: string;
  label: string;
}

export interface ContactInfo {
  icon: IconType;
  label: string;
  value: string;
  link: string | null;
}

export interface Status {
  message: string;
  type: "success" | "error" | "loading" | "";
}
