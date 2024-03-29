import { Metadata } from 'next';
import NextLink from 'next/link';

import phrases from 'data/phrases';

export const metadata: Metadata = {
  title: 'Not Found',
  description: phrases._404.description || 'Not Found',
};

const _404Page = () => {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-7 py-5">
      <div className="duration-default text-9xl font-bold text-gray-200 dark:text-gray-800 sm:text-[180px] xl:text-[250px]">
        404
      </div>
      <h1 className="strong-text break-keep text-center text-2xl font-bold sm:text-3xl xl:text-4xl">
        {phrases._404.title}
      </h1>
      <div className="middle-text duration-default break-keep text-center text-lg font-semibold text-gray-500 sm:text-xl">
        {phrases._404.description}
      </div>
      <NextLink
        href="/"
        className="button-color rounded-md px-5 py-2 font-semibold duration-300 sm:text-lg"
      >
        {phrases._404.goToMain}
      </NextLink>
    </div>
  );
};

export default _404Page;
