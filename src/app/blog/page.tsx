import { Metadata } from 'next';

import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';

import { allBlogs } from 'contentlayer/generated';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';

import ListLayout from '@/layouts/ListLayout';

export const metadata: Metadata = {
  title: 'Blog',
  description: phrases.Seo.blogDesc || siteMetadata.description,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/blog`,
  },
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
