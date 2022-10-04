import { Parent } from 'unist';

export interface ProjectData {
  [key: string]: {
    title: string;
    description: string;
    href: string;
  }[];
}

export interface PostItems {
  [key: string]: string;
}

export interface PostFrontMatter {
  title: string;
  date: string;
  modifiedTime: string;
  summary: string;
  image: string;
  slug: string;
  views?: string;

  category?: string;
  tags?: string[];
}

export interface PageFrontMatter {
  title: string;
  description: string;
  slug: string;
}

export interface Heading extends Parent {
  type: 'heading';
  depth: 1 | 2 | 3 | 4 | 5 | 6;
}

export type Toc = {
  value: string;
  depth: number;
  url: string;
}[];

export type FileType = 'blog' | 'page';
