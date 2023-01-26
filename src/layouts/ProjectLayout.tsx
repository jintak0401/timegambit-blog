import type { Project } from 'contentlayer/generated';
import NextImage from 'next/image';
import { ReactNode } from 'react';

import { CoreContent } from '@/lib/contentlayer';

import PageTitle from '@/components/blog/PageTitle';
import ScrollIndicator from '@/components/blog/ScrollIndicator';
import Comments from '@/components/comments';
import ScrollTopAndBottom from '@/components/common/ScrollTopAndBottom';
import LargeWidthTOC from '@/components/TOC/LargeWidthTOC';
import SmallWidthTOC from '@/components/TOC/SmallWidthTOC';

interface Props {
  content: CoreContent<Project>;
  children: ReactNode;
}

export default function ProjectLayout({ content, children }: Props) {
  const { title, images } = content;

  return (
    <>
      <ScrollIndicator />
      <ScrollTopAndBottom />
      <article>
        <header className="pb-10 text-center">
          <PageTitle>{title}</PageTitle>
        </header>
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
            <div className="prose max-w-none pt-10 pb-5 dark:prose-dark">
              {children}
            </div>
            <LargeWidthTOC />
            <SmallWidthTOC />
          </div>
          <footer>
            <Comments />
          </footer>
        </div>
      </article>
    </>
  );
}
