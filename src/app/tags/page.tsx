import NextLink from 'next/link';

import phrases from 'data/phrases';
import siteMetadata from 'data/site-metadata.mjs';

import { slug } from 'github-slugger';

import { getAllTags } from '@/lib/get-blog-info.mjs';
import { generateDefaultMetadata } from '@/lib/metadata';

import Tag from '@/components/card-and-list/tag';

export const metadata = generateDefaultMetadata({
  title: 'Tags',
  description: phrases.Seo.tagDesc || siteMetadata.description,
  url: `${siteMetadata.siteUrl}/tags`,
});

const getTags = async () => {
  return (await getAllTags()) as Record<string, number>;
};

const TagListPage = async () => {
  const tags = await getTags();
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);

  return (
    <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="duration-default text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
          Tags
        </h1>
      </div>
      <div className="flex max-w-lg flex-wrap">
        {Object.keys(tags).length === 0 && 'No tags found.'}
        {sortedTags.map((t) => {
          return (
            <div key={t} className="mb-2 mr-5 mt-2">
              <Tag text={t} />
              <NextLink
                href={`/tags/${slug(t)}`}
                className="duration-default -ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
              >
                {` (${tags[t]})`}
              </NextLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagListPage;
