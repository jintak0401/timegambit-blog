import slugger from 'github-slugger';
import Image from 'next/image';
import Link from 'next/link';

import { SeriesListItem } from '@/lib/types';
import useFormattedDate from '@/hooks/useFormattedDate';

import phrases from '@/data/phrases';

interface Props {
  series: SeriesListItem;
}

const SeriesCard = ({ series }: Props) => {
  const { title, image, length, lastmod } = series;
  return (
    <div className="p-4 md:w-1/3">
      <Link
        href={`/series/${slugger.slug(title)}`}
        aria-label={`Link to ${title}`}
      >
        <a>
          <Image
            alt={title}
            src={image}
            className="object-cover object-center"
            width={544}
            height={740}
          />
          <div>
            <h2>{title}</h2>
            <div>
              <span>
                {phrases.Series.seriesLength.replace('?', length.toString())}
              </span>
              <span>·</span>
              <span>
                {phrases.Series.lastUpdate} {useFormattedDate(lastmod)}
              </span>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default SeriesCard;
