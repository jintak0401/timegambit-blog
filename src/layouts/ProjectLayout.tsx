import { ReactNode } from 'react';
import NextImage from 'next/image';

import type { Project } from 'contentlayer/generated';

import { CoreContent } from '@/lib/contentlayer';

import PageTitle from '@/components/blog/page-title';
import ScrollIndicator from '@/components/blog/scroll-indicator';
import Comments from '@/components/comments';
import ScrollTopAndBottom from '@/components/common/scroll-top-and-bottom';
import LargeWidthToc from '@/components/TOC/large-width-toc';
import SmallWidthToc from '@/components/TOC/small-width-toc';

interface Props {
  children: ReactNode;
  content: CoreContent<Project>;
}

export default function ProjectLayout({ content, children }: Props) {
  const { title, images } = content;

  return (
    <>
      <ScrollIndicator />
      <ScrollTopAndBottom />
      <article>
        <div
          className="divide-y divide-gray-200 dark:divide-gray-700"
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <div className="relative divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2">
            {images && images.length > 0 && (
              <NextImage
                src={images[0]}
                className="aspect-[191/100] w-full rounded-md object-cover"
                alt="post image"
                width="1910"
                height="1000"
              />
            )}
            <header className="mt-10 text-center xl:mb-5 xl:mt-14">
              <PageTitle>{title}</PageTitle>
            </header>
            <div className="prose max-w-none pb-5 pt-10 dark:prose-dark">
              {children}
            </div>
            <LargeWidthToc />
            <SmallWidthToc />
          </div>
          <footer>
            <Comments />
          </footer>
        </div>
      </article>
    </>
  );
}
