import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { getAllSeries } from '@/lib/getBlogInfo.mjs';

import phrases from '@/data/phrases';
import siteMetadata from '@/data/siteMetadata';

import SeriesList from '@/components/card-and-list/SeriesList';
import { PageSEO } from '@/components/common/SEO';

export const getStaticProps: GetStaticProps = async () => {
  const series = Object.values(await getAllSeries());
  return {
    props: { series },
  };
};

export default function SeriesPage({
  series,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Series - ${siteMetadata.author}`}
        description={phrases.Seo.seriesDesc || siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="basic-text text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {phrases.Series.title}
          </h1>
          <p className="middle-text text-lg leading-7">
            {phrases.Series.description}
          </p>
        </div>
        <div className="py-12">
          <SeriesList series={series} />
        </div>
      </div>
    </>
  );
}
