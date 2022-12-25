import type { Blog } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import React, { ReactNode } from 'react';

import { coreContent } from '@/lib/contentlayer';

import PostLayout from '@/layouts/PostLayout';

import Alert from './Alert';
import CustomImage from './CustomImage';
import CustomLink from './CustomLink';
import Pre from './Pre';

interface MDXLayout {
  layout: string;
  content: Blog;
  [key: string]: unknown;
}

const Wrapper = ({ layout, content, children, ...rest }: MDXLayout) => {
  return (
    <PostLayout content={content} {...rest}>
      {children as ReactNode}
    </PostLayout>
  );
};

export const MDXComponents = {
  wrapper: Wrapper,
  img: CustomImage,
  a: CustomLink,
  pre: Pre,
  Alert,
};

export const MDXLayoutRenderer = ({ layout, content, ...rest }: MDXLayout) => {
  const MDXLayout = useMDXComponent(content.body.code);
  const mainContent = coreContent(content);

  return (
    <MDXLayout
      layout={layout}
      content={mainContent}
      components={MDXComponents}
      {...rest}
    />
  );
};
