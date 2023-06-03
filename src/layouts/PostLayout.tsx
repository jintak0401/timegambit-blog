import { ReactNode } from 'react';

import type { Blog } from 'contentlayer/generated';

import { CoreContent } from '@/lib/contentlayer';
import formattedDate from '@/lib/formattedDate';
import { isProd } from '@/lib/is-production';

import PageTitle from '@/components/blog/page-title';
import PostLike from '@/components/blog/post-like';
import PostListInSeries from '@/components/blog/post-list-in-series';
import RoutePostButton from '@/components/blog/route-post-button';
import ScrollIndicator from '@/components/blog/scroll-indicator';
import ShareButton from '@/components/blog/share-button';
import TagInPost from '@/components/blog/tag-in-post';
import ViewCountUpdater from '@/components/blog/view-count-updater';
import Comments from '@/components/comments';
import ScrollTopAndBottom from '@/components/common/scroll-top-and-bottom';
import LargeWidthToc from '@/components/TOC/large-width-toc';
import SmallWidthToc from '@/components/TOC/small-width-toc';

interface Props {
  children: ReactNode;
  content: CoreContent<Blog>;
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
  const { slug, date, title, tags, summary } = content;

  return (
    <>
      <ScrollIndicator />
      <ScrollTopAndBottom />
      <article>
        <header className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="middle-text font-medium leading-6">
              <time dateTime={date}>{formattedDate(date)}</time>
            </dd>
          </dl>
          <PageTitle>{title}</PageTitle>
          {isProd && <ViewCountUpdater slug={slug} />}
        </header>
        <div
          className="divide-y divide-gray-200 pb-2 dark:divide-gray-700"
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <div className="relative divide-gray-200 pb-5 dark:divide-gray-700 xl:col-span-3 xl:row-span-2">
            {seriesTitle && series && (
              <PostListInSeries seriesTitle={seriesTitle} series={series} />
            )}
            <div className="prose max-w-none pb-10 pt-10 dark:prose-dark sm:pb-12 xl:pb-20">
              {children}
            </div>
            <LargeWidthToc />
            <SmallWidthToc />
            <PostLike slug={slug} />
            {tags && (
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <TagInPost key={tag} title={tag} />
                ))}
                <ShareButton title={title} text={summary} />
              </div>
            )}
          </div>
          <footer className="space-y-2 pt-5 md:space-y-4">
            {(prev || next) && (
              <div className="flex w-full flex-col-reverse gap-2 md:flex-row">
                <RoutePostButton
                  title={prev?.title}
                  slug={prev?.slug}
                  direction={'prev'}
                  empty={!prev}
                />
                <RoutePostButton
                  title={next?.title}
                  slug={next?.slug}
                  direction={'next'}
                  empty={!next}
                />
              </div>
            )}
            <Comments />
          </footer>
        </div>
      </article>
    </>
  );
}
