import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import phrases from '@/data/phrases';

interface Props {
  categoryTitle: string;
  series: { title: string; slug: string }[];
}

const CategoryList = ({ categoryTitle, series }: Props) => {
  const router = useRouter();
  const [disclosure, setDisclosure] = useState(true);
  const curSlug = decodeURI(router.asPath.split('/').at(-1) as string);

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
              : 'hover:bg-primary-100 hover:dark:bg-primary-900'
          }`}
          key={index}
          onClick={() => router.push(`/blog/${series[nextIdx].slug}`)}
          disabled={isDisabled}
        >
          <Icon className="h-6 w-6 text-primary-500" />
        </button>
      ))}
    </span>
  );

  return (
    <div className="mt-5 rounded-md bg-gray-100 px-6 py-5 transition-colors duration-500 dark:bg-gray-800">
      <svg
        width="32"
        height="48"
        viewBox="0 0 32 48"
        className="absolute top-0 right-4 h-auto w-6 fill-current text-primary-500 lg:right-6 lg:w-fit"
      >
        <path fill="currentColor" d="M32 0H0v48h.163l16-16L32 47.836V0z" />
      </svg>
      <header>
        <Link href={`/categories/${categoryTitle}`}>
          <a className="mb-7 block inline-block text-xl font-semibold text-gray-700 hover:text-gray-500 hover:underline dark:text-gray-200 hover:dark:text-gray-400 md:text-3xl">
            {categoryTitle}
          </a>
        </Link>
      </header>
      {disclosure && (
        <ol className="list-inside list-decimal space-y-1 marker:italic marker:text-gray-400 marker:before:mr-1 marker:dark:text-gray-500">
          {series.map(({ slug, title }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>
                <a
                  className={`hover:underline
                ${
                  slug === curSlug
                    ? 'font-semibold text-primary-500'
                    : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-200'
                }`}
                >
                  {title}
                </a>
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
          {disclosure ? phrases.Post.closeCategory : phrases.Post.openCategory}
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

export default CategoryList;
