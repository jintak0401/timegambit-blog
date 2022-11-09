import { Parent } from 'unist';

import { ConvertPick } from '@/lib/contentlayer';

export interface ProjectData {
  [key: string]: {
    title: string;
    description: string;
    href: string;
  }[];
}

export type PostListItem = ConvertPick<{
  title: string;
  slug: string;
  date: string;
  images: string[];
  summary?: string;
  tags?: string[];
}>;

export interface PostFrontMatter {
  title: string;
  date: string;
  modifiedTime: string;
  summary: string;
  image: string;
  slug: string;
  views?: string;

  series?: string;
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

export interface TocElement {
  id: string;
  nodeName: string;
  textContent: string;
}

export type FileType = 'blog' | 'page';
