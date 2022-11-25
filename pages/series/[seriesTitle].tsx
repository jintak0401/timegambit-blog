import { allBlogs } from 'contentlayer/generated';
import { slug } from 'github-slugger';
import { InferGetStaticPropsType } from 'next';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';
import { getAllSeries } from '@/lib/getBlogInfo.mjs';
import { PostListItem, SeriesListItem } from '@/lib/types';

import siteMetadata from '@/data/siteMetadata';

import { PageSEO } from '@/components/SEO';

import ListLayout from '@/layouts/ListLayout';

export async function getStaticPaths() {
  const series = await getAllSeries();

  return {
    paths: Object.keys(series).map((seriesTitle) => ({
      params: {
        seriesTitle: slug(seriesTitle),
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
    ({ series, draft }) => !draft && series && slug(series) === seriesTitle
  );
  const allSeries = await getAllSeries();
  const series: SeriesListItem =
    allSeries[posts[0].series as keyof typeof allSeries];

  return {
    props: { posts: posts.map(pickBlogItem), series },
  };
};

export default function SeriesPost({
  series,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Series | ${series['title']} - ${siteMetadata.author}`}
        description={siteMetadata.description}
        image={siteMetadata.siteUrl + series['image']}
      />
      <ListLayout posts={posts as PostListItem[]} title={series['title']} />
    </>
  );
}
