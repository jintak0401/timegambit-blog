import { Metadata } from 'next';

import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';

import { getAllSeries } from '@/lib/getBlogInfo.mjs';

import SeriesList from '@/components/card-and-list/series-list';

import { SeriesListItem } from '@/types';

export const metadata: Metadata = {
  title: 'Series',
  description: phrases.Seo.seriesDesc || siteMetadata.description,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/series`,
  },
};

const getSeries = async (): Promise<SeriesListItem[]> => {
  return Object.values(await getAllSeries()).sort((a, b) => {
    return Number(new Date(b.lastmod)) - Number(new Date(a.lastmod));
  });
};

const SeriesPage = async () => {
  const series = await getSeries();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="strong-text text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {phrases.Series.title}
        </h1>
        <div className="middle-text text-lg leading-7">
          {phrases.Series.description}
        </div>
      </div>
      <div className="py-12">
        <SeriesList series={series} />
      </div>
    </div>
  );
};

export default SeriesPage;
