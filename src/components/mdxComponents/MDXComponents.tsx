import type { Blog } from 'contentlayer/generated';
import dynamic from 'next/dynamic';
import { useMDXComponent } from 'next-contentlayer/hooks';
import React, { ReactNode } from 'react';

import { coreContent } from '@/lib/contentlayer';

import PostLayout from '@/layouts/PostLayout';

import Alert from './Alert';
import CustomLink from './CustomLink';
import CustomMedia from './CustomMedia';
import Pre from './Pre';

const Logo = dynamic(() => import('data/logo/Logo'));

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
  img: CustomMedia,
  a: CustomLink,
  pre: Pre,
  Alert,
  Logo,
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
