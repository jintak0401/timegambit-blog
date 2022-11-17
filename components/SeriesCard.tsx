import { SeriesListItem } from '@/lib/types';

interface Props {
  series: SeriesListItem;
}

const SeriesCard = ({ series }: Props) => {
  const { title } = series;
  return <div>{title}</div>;
};

export default SeriesCard;
