'use client';

import phrases from 'data/phrases';

const ErrorPage = () => {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-7 py-5">
      <div className="duration-default text-9xl font-bold text-gray-200 dark:text-gray-800 sm:text-[180px] xl:text-[250px]">
        Error
      </div>
      <h1 className="strong-text break-keep text-center text-2xl font-bold sm:text-3xl xl:text-4xl">
        {phrases.Error.title}
      </h1>
      <div className="middle-text duration-default break-keep text-center text-lg font-semibold text-gray-500 sm:text-xl">
        {phrases.Error.description}
      </div>
    </div>
  );
};

export default ErrorPage;
