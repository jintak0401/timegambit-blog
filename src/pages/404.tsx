import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';
import Link from 'next/link';

import { PageSEO } from '@/components/common/SEO';

export default function Page404() {
  return (
    <>
      <PageSEO
        title={`404 - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="flex h-[60vh] flex-col items-center justify-center gap-7 py-5">
        <div
          className="text-9xl font-bold text-gray-200 duration-500 dark:text-gray-800
          sm:text-[180px] xl:text-[250px]"
        >
          404
        </div>
        <h1 className="strong-text break-keep text-center text-2xl font-bold duration-500 sm:text-3xl xl:text-4xl">
          {phrases._404.title}
        </h1>
        <div className="middle-text break-keep text-center text-lg font-semibold text-gray-500 duration-500 sm:text-xl">
          {phrases._404.description}
        </div>
        <Link
          href="/"
          className="rounded-md bg-primary-100 bg-opacity-50 py-2 px-5 font-semibold
            text-primary-600 text-opacity-70 duration-300 hover:bg-opacity-100 hover:text-opacity-100
            dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-700 sm:text-lg"
        >
          {phrases._404.goToMain}
        </Link>
      </div>
    </>
  );
}
