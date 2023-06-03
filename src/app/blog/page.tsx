import { Metadata } from 'next';

import phrases from 'data/phrases';
import siteMetadata from 'data/site-metadata.mjs';

import { allBlogs } from 'contentlayer/generated';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';
import { defaultOpenGraph, defaultTwitter } from '@/lib/metadata';

import ListLayout from '@/layouts/list-layout';

export const dynamic = 'force-static';
export const generateMetadata = (): Metadata => {
  const title = 'Blog';
  const ogTitle = siteMetadata.titleTemplate.replace('%s', title);
  const description = phrases.Seo.blogDesc || siteMetadata.description;
  const url = `${siteMetadata.siteUrl}/blog`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...defaultOpenGraph,
      title: ogTitle,
      description,
      url,
    },
    twitter: {
      ...defaultTwitter,
      title: ogTitle,
      description,
    },
  };
};

const getPosts = async () => {
  return sortedBlogPost(allBlogs)
    .filter(({ draft }) => !draft)
    .map(pickBlogItem);
};
const BlogPage = async () => {
  const posts = await getPosts();
  return (
    <ListLayout
      posts={posts}
      title={phrases.Blog.title}
      description={phrases.Blog.description}
    />
  );
};

export default BlogPage;
