import { slug } from 'github-slugger';
import Link from 'next/link';

import { SeriesListItem } from '@/lib/types';
import useFormattedDate from '@/hooks/useFormattedDate';

import phrases from '@/data/phrases';

import AutoImage from '@/components/Image/AutoImage';

interface Props {
  series: SeriesListItem;
}

const SeriesCard = ({ series }: Props) => {
  const { title, image, length, lastmod } = series;
  return (
    <article className="rounded-md border-2 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl dark:border-gray-600 dark:shadow-none">
      <Link href={`/series/${slug(title)}`} aria-label={`Link to ${title}`}>
        <a>
          <AutoImage
            src={image}
            alt={title}
            className={'rounded-md'}
            priority={true}
          />
          <div className="px-2 py-3">
            <h2 className="strong-text mt-3 mb-1 text-lg font-semibold">
              {title}
            </h2>
            <div className="text-[15px]">
              <span className="middle-text">
                {phrases.Series.seriesLength.replace('?', length.toString())}
              </span>
              <span className="weak-text"> · </span>
              <span className="weak-text">
                {phrases.Series.lastUpdate} {useFormattedDate(lastmod)}
              </span>
            </div>
          </div>
        </a>
      </Link>
    </article>
  );
};

export default SeriesCard;
