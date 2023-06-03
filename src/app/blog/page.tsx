import { Metadata } from 'next';

import phrases from 'data/phrases';
import siteMetadata from 'data/site-metadata.mjs';

import { allBlogs } from 'contentlayer/generated';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';

import ListLayout from '@/layouts/list-layout';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Blog',
    description: phrases.Seo.blogDesc || siteMetadata.description,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/blog`,
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
