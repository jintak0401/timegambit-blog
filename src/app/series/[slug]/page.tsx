import { Metadata } from 'next';

import phrases from 'data/phrases';
import seriesData from 'data/series-data.mjs';
import siteMetadata from 'data/siteMetadata.mjs';

import { allBlogs } from 'contentlayer/generated';
import { slug as slugger } from 'github-slugger';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';
import { getAllSeries } from '@/lib/get-blog-info.mjs';
import { getImageWithFallback } from '@/lib/utils';

import ListLayout from '@/layouts/list-layout';
import { SeriesListItem } from '@/types';

interface Props {
  params: {
    slug: string;
  };
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const seriesTitle = Object.keys(seriesData).find(
    (title) => seriesData[title as keyof typeof seriesData].slug === params.slug
  ) as keyof typeof seriesData;

  const seriesImage = seriesData[seriesTitle].image;
  const images = getImageWithFallback(seriesData[seriesTitle].image);
  const url = `${siteMetadata.siteUrl}/series/${params.slug}`;
  const description =
    phrases.Seo.specificSeriesDesc?.replace('%s', seriesTitle) ||
    `[${seriesTitle}] series - ${siteMetadata.author}`;

  return {
    title: `Series - ${seriesTitle}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title: seriesTitle,
      description,
      images,
    },
    twitter: {
      title: seriesTitle,
      description,
      images,
    },
  };
};

export const dynamicParams = false;
export const generateStaticParams = async () => {
  const series = await getAllSeries();

  return Object.values(series).map(({ href }) => ({
    slug: href,
  }));
};

const getSeriesData = async (slug: string) => {
  const seriesSlug = slug;
  const posts = sortedBlogPost(allBlogs).filter(
    ({ series, draft }) =>
      !draft &&
      series &&
      slugger(seriesData[series as keyof typeof seriesData]?.slug) ===
        seriesSlug
  );

  const allSeries = await getAllSeries();
  const series: SeriesListItem =
    allSeries[posts[0].series as keyof typeof allSeries];

  return {
    posts: posts.map(pickBlogItem),
    series,
  };
};

const SeriesPostListPage = async ({ params }: Props) => {
  const { posts, series } = await getSeriesData(params.slug);
  return <ListLayout posts={posts} title={series.title} />;
};

export default SeriesPostListPage;
