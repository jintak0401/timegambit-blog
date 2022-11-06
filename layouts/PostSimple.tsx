import type { Blog } from 'contentlayer/generated';
import { ReactNode } from 'react';

import { CoreContent } from '@/lib/contentlayer';
import useFormattedDate from '@/hooks/useFormattedDate';

import siteMetadata from '@/data/siteMetadata';

import CategoryList from '@/components/CategoryList';
import Comments from '@/components/comments';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import ScrollIndicator from '@/components/ScrollIndicator';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import SectionContainer from '@/components/SectionContainer';
import { BlogSEO } from '@/components/SEO';
import TOC from '@/components/TOC';

interface Props {
  content: CoreContent<Blog>;
  children: ReactNode;
  next?: { slug: string; title: string };
  prev?: { slug: string; title: string };
  series?: { slug: string; title: string }[];
  categoryTitle?: string;
}

export default function PostLayout({
  content,
  next,
  prev,
  series,
  categoryTitle,
  children,
}: Props) {
  const { slug, date, title } = content;

  return (
    <SectionContainer>
      <ScrollIndicator />
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${slug}`} {...content} />
      <ScrollTopAndComment />
      <article className="transition-colors duration-500">
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {useFormattedDate(date) || 'nbsp;'}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0 "
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="relative divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              {categoryTitle && series && (
                <CategoryList categoryTitle={categoryTitle} series={series} />
              )}
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                {children}
              </div>
              <TOC />
            </div>
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${next.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
            <Comments frontMatter={content} />
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
