import { allBlogs } from 'contentlayer/generated';
import { slug } from 'github-slugger';
import { InferGetStaticPropsType } from 'next';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';
import { getAllSeries } from '@/lib/getBlogInfo.mjs';
import { PostListItem, SeriesListItem } from '@/lib/types';
import { getImageWithFallback } from '@/lib/utils';

import phrases from '@/data/phrases';
import seriesData from '@/data/seriesData';
import siteMetadata from '@/data/siteMetadata';

import { PageSEO } from '@/components/common/SEO';

import ListLayout from '@/layouts/ListLayout';

export async function getStaticPaths() {
  const series = await getAllSeries();

  return {
    paths: Object.values(series).map(({ href }) => ({
      params: {
        seriesSlug: href,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps = async ({
  params,
}: {
  params: { seriesSlug: string };
}) => {
  const seriesSlug = params.seriesSlug;
  const posts = sortedBlogPost(allBlogs).filter(
    ({ series, draft }) =>
      !draft &&
      series &&
      slug(seriesData[series as keyof typeof seriesData]?.slug) === seriesSlug
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
        description={
          phrases.Seo.specificSeriesDesc?.replace('?', series['title']) ||
          `[${series['title']}] series - ${siteMetadata.author}`
        }
        image={getImageWithFallback(
          series['image'],
          siteMetadata.siteUrl + series['image']
        )}
      />
      <ListLayout posts={posts as PostListItem[]} title={series['title']} />
    </>
  );
}
