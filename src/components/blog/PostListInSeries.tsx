import phrases from 'data/phrases';
import seriesData from 'data/seriesData.mjs';
import { slug } from 'github-slugger';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { ImBookmark } from 'react-icons/im';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface Props {
  seriesTitle: string;
  series: { title: string; slug: string }[];
}

const PostListInSeries = ({ seriesTitle, series }: Props) => {
  const router = useRouter();
  const [disclosure, setDisclosure] = useState(
    router.query.disclosure === 'true'
  );

  const curSlug = decodeURI(
    router.asPath.split('/').slice(2).join('/').split('#')[0]
  );

  const idx = series.map(({ slug }) => slug).indexOf(curSlug as string) + 1;

  const routeBtns = (
    <span className="flex items-center justify-center space-x-3">
      {[
        {
          Icon: MdKeyboardArrowLeft,
          isDisabled: idx === 1,
          nextIdx: idx - 2,
        },
        {
          Icon: MdKeyboardArrowRight,
          isDisabled: idx === series.length,
          nextIdx: idx,
        },
      ].map(({ Icon, isDisabled, nextIdx }, index) => (
        <button
          className={`rounded-full bg-white dark:bg-gray-700 ${
            isDisabled
              ? 'opacity-40'
              : 'hover:bg-primary-100 hover:dark:bg-primary-800'
          }`}
          key={index}
          onClick={() =>
            router.push(
              {
                pathname: '/blog/[...slug]',
                query: {
                  disclosure,
                },
              },
              `/blog/${series[nextIdx].slug}`
            )
          }
          disabled={isDisabled}
        >
          <span className="sr-only">
            {nextIdx === idx ? 'next' : 'prev'} post in series
          </span>
          <Icon className="h-6 w-6 text-primary-500" />
        </button>
      ))}
    </span>
  );

  return (
    <div className="duration-default mt-5 rounded-md bg-gray-100 px-6 py-5 dark:bg-gray-800">
      <ImBookmark className="absolute top-0 right-2 h-auto w-10 fill-current text-primary-500 lg:right-4 lg:w-12" />
      <header>
        <Link
          className="mb-7 block inline-block text-xl font-semibold text-gray-700 hover:text-gray-500 hover:underline dark:text-gray-200 hover:dark:text-gray-400 md:text-3xl"
          href={`/series/${slug(
            seriesData[seriesTitle as keyof typeof seriesData]?.slug ||
              seriesTitle
          )}`}
        >
          {seriesTitle}
        </Link>
      </header>
      {disclosure && (
        <ol className="list-inside list-decimal space-y-1 marker:italic marker:text-gray-400 marker:before:mr-1 marker:dark:text-gray-500">
          {series.map(({ slug, title }) => (
            <li key={slug}>
              <Link
                href={{
                  pathname: '/blog/[...slug]',
                  query: { disclosure },
                }}
                as={`/blog/${slug}`}
                className={`hover:underline
                ${
                  slug === curSlug
                    ? 'font-semibold text-primary-500 dark:text-primary-400'
                    : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-200'
                }`}
              >
                {title}
              </Link>
            </li>
          ))}
        </ol>
      )}
      <footer className="flex items-center justify-between">
        <button
          className="my-5 flex items-center justify-center text-gray-700 hover:text-gray-900 dark:text-gray-300"
          onClick={() => setDisclosure((prev) => !prev)}
        >
          <GoTriangleDown className={`mr-2 ${disclosure && 'rotate-180'}`} />
          {disclosure ? phrases.Blog.closeSeries : phrases.Blog.openSeries}
        </button>
        <span className="flex items-center justify-center space-x-5">
          <span className="dark:text-gray-400">
            {idx} / {series.length}
          </span>
          {routeBtns}
        </span>
      </footer>
    </div>
  );
};

export default PostListInSeries;
