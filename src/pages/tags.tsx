import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';
import { slug } from 'github-slugger';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { getAllTags } from '@/lib/getBlogInfo.mjs';

import Tag from '@/components/card-and-list/Tag';
import { PageSEO } from '@/components/common/SEO';
import Link from '@/components/mdxComponents/CustomLink';

export const getStaticProps: GetStaticProps<{
  tags: Record<string, number>;
}> = async () => {
  const tags = (await getAllTags()) as Record<string, number>;

  return { props: { tags } };
};

export default function TagListPage({
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  return (
    <>
      <PageSEO
        title={`Tags - ${siteMetadata.author}`}
        description={phrases.Seo.tagDesc || siteMetadata.description}
      />
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 duration-500 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag text={t} />
                <Link
                  href={`/tags/${slug(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 duration-500 dark:text-gray-300"
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
