'use client';

import { useState } from 'react';
import NextLink from 'next/link';

import phrases from 'data/phrases';

import formatDate from '@/lib/format-date';

import ImageWithFallback from '@/components/image/image-with-fallback';

import { SeriesListItem } from '@/types';

interface Props {
  series: SeriesListItem;
}

const SeriesCard = ({ series }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const { title, image, length, lastmod, href } = series;
  return (
    <article
      className={`rounded-md border-2 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl dark:border-gray-600 dark:shadow-none ${
        loaded ? 'animate-card' : 'opacity-0'
      }`}
    >
      <NextLink href={`/series/${href}`} aria-label={`Link to ${title}`}>
        <ImageWithFallback
          src={image}
          alt={title}
          className="aspect-[191/100] rounded-md object-cover"
          onLoad={() => {
            setLoaded(true);
          }}
        />
        <div className="px-2 py-3">
          <h2 className="strong-text mb-1 mt-3 text-lg font-semibold">
            {title}
          </h2>
          <span className="middle-text">
            {phrases.Series.seriesLength.replace('%d', length.toString())}
          </span>
          <span className="weak-text"> · </span>
          <span className="weak-text">
            {phrases.Series.lastUpdate} {formatDate(lastmod, false)}
          </span>
        </div>
      </NextLink>
    </article>
  );
};

export default SeriesCard;
