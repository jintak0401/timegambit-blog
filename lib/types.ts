import { MDXRemoteSerializeResult } from 'next-mdx-remote';

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

export interface PostProps {
  source: MDXRemoteSerializeResult;
  frontMatter: PostFrontMatter;
}

export interface BlogPostProps {
  post: PostProps;
  ogImage: string;
  series?: PostFrontMatter[];
}

export type FileType = 'blog' | 'page';
