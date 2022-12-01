import type { Blog } from 'contentlayer/generated';
import { ComponentMap } from 'mdx-bundler/client';
import dynamic from 'next/dynamic';
import { useMDXComponent } from 'next-contentlayer/hooks';
import React from 'react';

import { coreContent } from '@/lib/contentlayer';

import Alert from './Alert';
import CustomImage from './CustomImage';
import CustomLink from './CustomLink';
import { BlogNewsletterForm } from './NewsletterForm';
import Pre from './Pre';

interface MDXLayout {
  layout: string;
  content: Blog;
  [key: string]: unknown;
}

interface LayoutProps {
  content: Blog;
  [key: string]: unknown;
}

const Wrapper = ({ layout, content, ...rest }: MDXLayout) => {
  const Layout = dynamic<LayoutProps>(() => import(`@/layouts/${layout}`));
  return <Layout content={content} {...rest} />;
};

export const MDXComponents: ComponentMap = {
  img: CustomImage,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  BlogNewsletterForm,
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
