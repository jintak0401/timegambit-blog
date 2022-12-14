import type { Blog } from 'contentlayer/generated';
import { ReactNode } from 'react';

import { CoreContent } from '@/lib/contentlayer';
import formattedDate from '@/lib/formattedDate';
import { isProd } from '@/lib/isProduction';

import PageTitle from '@/components/blog/PageTitle';
import PostLike from '@/components/blog/PostLike';
import PostListInSeries from '@/components/blog/PostListInSeries';
import RoutePostBtn from '@/components/blog/RoutePostBtn';
import ScrollIndicator from '@/components/blog/ScrollIndicator';
import ShareBtn from '@/components/blog/ShareBtn';
import TagInPost from '@/components/blog/TagInPost';
import ViewCounter from '@/components/blog/ViewCounter';
import Comments from '@/components/comments';
import ScrollTopAndBottom from '@/components/common/ScrollTopAndBottom';
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
  const { slug, date, title, tags, summary } = content;

  return (
    <>
      <ScrollIndicator />
      <ScrollTopAndBottom />
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formattedDate(date)}</time>
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
              <LargeWidthTOC />
              <SmallWidthTOC />
              <PostLike slug={slug} />
              {tags && (
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <TagInPost key={tag} title={tag} />
                  ))}
                  <ShareBtn title={title} text={summary} />
                </div>
              )}
            </div>
            <footer className="space-y-2 pt-5 md:space-y-4">
              {(prev || next) && (
                <div className="flex w-full flex-col-reverse gap-2 md:flex-row">
                  <RoutePostBtn
                    title={prev?.title}
                    slug={prev?.slug}
                    direction={'prev'}
                    empty={!prev}
                  />
                  <RoutePostBtn
                    title={next?.title}
                    slug={next?.slug}
                    direction={'next'}
                    empty={!next}
                  />
                </div>
              )}
              <Comments frontMatter={content} />
            </footer>
          </div>
        </div>
      </article>
    </>
  );
}
