import { Metadata } from 'next';

import phrases from 'data/phrases';
import siteMetadata from 'data/site-metadata.mjs';

import { allBlogs } from 'contentlayer/generated';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';
import { generateDefaultMetadata } from '@/lib/metadata';

import ListLayout from '@/layouts/list-layout';

export const metadata: Metadata = generateDefaultMetadata({
  title: 'Blog',
  description: phrases.Seo.blogDesc || siteMetadata.description,
  url: `${siteMetadata.siteUrl}/blog`,
});

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
