import { Parent } from 'unist';

import { ConvertPick } from '@/lib/contentlayer';

export type PostListItem = ConvertPick<{
  title: string;
  slug: string;
  date: string;
  images: string[];
  summary?: string;
  tags?: string[];
}>;

export interface Heading extends Parent {
  type: 'heading';
  depth: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TocElement {
  id: string;
  nodeName: string;
  textContent: string;
}

export interface SeriesListItem {
  title: string;
  length: number;
  lastmod: string;
  image: string;
  href: string;
}
