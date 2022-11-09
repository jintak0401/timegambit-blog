import { allBlogs } from 'contentlayer/generated';
import { InferGetStaticPropsType } from 'next';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';
import { PostListItem } from '@/lib/types';

import phrases from '@/data/phrases';
import siteMetadata from '@/data/siteMetadata';

import { PageSEO } from '@/components/SEO';

import ListLayout from '@/layouts/ListLayout';

export const getStaticProps = async () => {
  const posts = sortedBlogPost(allBlogs)
    .filter(({ draft }) => !draft)
    .map(pickBlogItem);

  return {
    props: {
      posts,
    },
  };
};

export default function BlogPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <ListLayout
        posts={posts as PostListItem[]}
        title={phrases.Blog.title}
        description={phrases.Blog.description}
      />
    </>
  );
}
