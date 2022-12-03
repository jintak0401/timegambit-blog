import type { Blog } from 'contentlayer/generated';
import { ReactNode } from 'react';

import { CoreContent } from '@/lib/contentlayer';
import { isProd } from '@/lib/isProduction';
import useFormattedDate from '@/hooks/useFormattedDate';

import siteMetadata from '@/data/siteMetadata';

import PageTitle from '@/components/blog/PageTitle';
import PostListInSeries from '@/components/blog/PostListInSeries';
import ScrollIndicator from '@/components/blog/ScrollIndicator';
import ScrollTopAndComment from '@/components/blog/ScrollTopAndComment';
import ViewCounter from '@/components/blog/ViewCounter';
import Comments from '@/components/comments';
import { BlogSEO } from '@/components/common/SEO';
import Link from '@/components/mdxComponents/CustomLink';
import TagInPost from '@/components/TagInPost';
import LargeWidthTOC from '@/components/TOC/LargeWidthTOC';
import SmallWidthTOC from '@/components/TOC/SmallWidthTOC';

interface Props {
  content: CoreContent<Blog>;
  children: ReactNode;
  next?: { slug: string; title: string };
  prev?: { slug: string; title: string };
  series?: { slug: string; title: string }[];
  seriesTitle?: string;
}

export default function PostLayout({
  content,
  next,
  prev,
  series,
  seriesTitle,
  children,
}: Props) {
  const { slug, date, title, tags } = content;

  return (
    <>
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
                      {useFormattedDate(date) || <br />}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
                {isProd && <ViewCounter slug={slug} />}
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="relative divide-gray-200 pb-5 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              {seriesTitle && series && (
                <PostListInSeries seriesTitle={seriesTitle} series={series} />
              )}
              <div className="prose max-w-none pb-10 pt-10 dark:prose-dark sm:pb-12 xl:pb-20">
                {children}
              </div>
              <LargeWidthTOC />
              <SmallWidthTOC />
              <div className="flex gap-3">
                {tags?.map((tag) => (
                  <TagInPost key={tag} title={tag} />
                ))}
              </div>
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
    </>
  );
}
