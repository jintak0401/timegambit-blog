import { allBlogs } from 'contentlayer/generated';
import { slug } from 'github-slugger';
import { InferGetStaticPropsType } from 'next';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';
import { getAllTags } from '@/lib/getBlogInfo.mjs';
import { PostListItem } from '@/lib/types';

import phrases from '@/data/phrases';
import siteMetadata from '@/data/siteMetadata';

import { TagSEO } from '@/components/common/SEO';

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
  const tagSlug = params.tag;
  const posts = sortedBlogPost(allBlogs)
    .filter(
      ({ tags, draft }) =>
        !draft && (tags ?? []).map((t) => slug(t)).includes(tagSlug)
    )
    .map(pickBlogItem);

  const tag = posts[0].tags?.find((t) => slug(t) === tagSlug) || tagSlug;

  return { props: { posts, tag } };
};

export default function TagPostListPage({
  posts,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <TagSEO
        title={`Tags | ${tag} - ${siteMetadata.author}`}
        description={
          phrases.Seo.specificTagDesc?.replace('?', tag) ||
          `#${tag} tags - ${siteMetadata.author}`
        }
      />
      <ListLayout posts={posts as PostListItem[]} title={tag} />
    </>
  );
}
