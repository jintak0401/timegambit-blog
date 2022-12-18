import phrases from 'data/phrases';

import { SeriesListItem } from '@/lib/types';

import SeriesCard from './SeriesCard';

interface Props {
  series: SeriesListItem[];
}

const SeriesList = ({ series }: Props) => {
  return (
    <ul className="grid grid-flow-row-dense grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
      {!series.length && phrases.Series.noSeries}
      {series.map((item) => (
        <li key={item.title}>
          <SeriesCard series={item} />
        </li>
      ))}
    </ul>
  );
};

export default SeriesList;
