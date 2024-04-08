import { ConvertPick } from '@/lib/contentlayer';

export type PostListItem = ConvertPick<{
  title: string;
  slug: string;
  date: string;
  images: string[];
  summary?: string;
  tags?: string[];
}>;

export interface TocElement {
  id: string;
  nodeName: string;
  textContent: string | null;
}

export interface SeriesListItem {
  title: string;
  length: number;
  lastmod: string;
  image: string;
  href: string;
}

export interface GuestbookEntryType {
  id: number;
  email: string;
  name: string;
  image: string;
  body: string;
  updatedAt: string;
}

export interface PopularPostType {
  slug: string;
}

export interface UserType {
  email: string;
  name: string;
  image: string;
}

export interface AboutCardType {
  title: string;
  date?: string;
  info: string[];
}
