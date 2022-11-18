import { allBlogs } from 'contentlayer/generated';
import slugger from 'github-slugger';
import { InferGetStaticPropsType } from 'next';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';
import { getAllSeries } from '@/lib/getBlogInfo.mjs';
import { PostListItem } from '@/lib/types';

import phrases from '@/data/phrases';
import siteMetadata from '@/data/siteMetadata';

import { PageSEO } from '@/components/SEO';

import ListLayout from '@/layouts/ListLayout';

export async function getStaticPaths() {
  const series = await getAllSeries();

  return {
    paths: Object.keys(series).map((seriesTitle) => ({
      params: {
        seriesTitle: slugger.slug(seriesTitle),
      },
    })),
    fallback: false,
  };
}

export const getStaticProps = async ({
  params,
}: {
  params: { seriesTitle: string };
}) => {
  const seriesTitle = params.seriesTitle;
  const posts = sortedBlogPost(allBlogs).filter(
    ({ series, draft }) =>
      !draft && series && slugger.slug(series) === seriesTitle
  );

  return {
    props: { posts: posts.map(pickBlogItem), seriesTitle: posts[0].series },
  };
};

export default function SeriesPost({
  seriesTitle,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Series - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <ListLayout
        posts={posts as PostListItem[]}
        title={seriesTitle}
        description={phrases.Series.description}
      />
    </>
  );
}
