'use client';

import { useState } from 'react';

import phrases from 'data/phrases';

import formattedDate from '@/lib/formattedDate';

import NavLink from '@/components/common/nav-link';
import ImageWithFallback from '@/components/Image/ImageWithFallback';

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
      <NavLink href={`/series/${href}`} aria-label={`Link to ${title}`}>
        <ImageWithFallback
          src={image}
          alt={title}
          className="aspect-[191/100] rounded-md object-cover"
          onLoadingComplete={() => {
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
            {phrases.Series.lastUpdate} {formattedDate(lastmod, false)}
          </span>
        </div>
      </NavLink>
    </article>
  );
};

export default SeriesCard;
