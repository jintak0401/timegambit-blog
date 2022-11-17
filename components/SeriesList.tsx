import { SeriesListItem } from '@/lib/types';

import phrases from '@/data/phrases';

import SeriesCard from '@/components/SeriesCard';

interface Props {
  series: SeriesListItem[];
}

const SeriesList = ({ series }: Props) => {
  return (
    <ul>
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
