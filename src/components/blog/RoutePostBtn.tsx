import phrases from 'data/phrases';
import Link from 'next/link';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';

interface Props {
  title?: string;
  slug?: string;

  direction: 'prev' | 'next';
  empty?: boolean;
}

const RoutePostBtn = ({ title, slug, direction, empty }: Props) => {
  if (empty) {
    return <div className="h-full w-full md:w-1/2" />;
  }

  const Arrow =
    direction === 'prev'
      ? IoArrowBackCircleOutline
      : IoArrowForwardCircleOutline;

  return (
    <Link
      href={`/blog/${slug}`}
      className={`group flex w-full items-center gap-2 rounded-md bg-gray-100 py-2 px-3 text-2xl font-semibold duration-300 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 md:w-1/2 ${
        direction === 'prev' ? 'flex-row-reverse justify-start' : 'justify-end'
      }`}
    >
      <div
        className={`flex flex-1 flex-col overflow-hidden ${
          direction === 'prev' ? 'items-start' : 'items-end'
        }`}
      >
        <div className="middle-text text-sm font-medium">
          {phrases.Blog[direction]}
        </div>
        <div className="max-w-full truncate text-gray-700 dark:text-gray-300">
          {title}
        </div>
      </div>
      <Arrow
        className={`h-9 w-9 fill-current text-primary-500 ${
          direction === 'prev'
            ? 'group-hover:animate-bounce-left'
            : 'group-hover:animate-bounce-right'
        }`}
      />
    </Link>
  );
};

export default RoutePostBtn;
