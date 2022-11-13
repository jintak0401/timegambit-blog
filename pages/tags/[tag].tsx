import { allBlogs } from 'contentlayer/generated';
import { InferGetStaticPropsType } from 'next';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';
import { getAllTags } from '@/lib/getBlogInfo.mjs';

import siteMetadata from '@/data/siteMetadata';

import { TagSEO } from '@/components/SEO';

import ListLayout from '@/layouts/ListLayout';

export async function getStaticPaths() {
  const tags = await getAllTags();

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps = async ({
  params,
}: {
  params: { tag: string };
}) => {
  const tag = params.tag;
  const posts = sortedBlogPost(allBlogs)
    .filter(({ tags, draft }) => !draft && (tags ?? []).includes(tag))
    .map(pickBlogItem);

  return { props: { posts, tag } };
};

export default function TagPostListPage({
  posts,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const title = (tag as string).split(' ').join('-');
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.title}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  );
}