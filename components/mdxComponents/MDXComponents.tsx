import type { Blog } from 'contentlayer/generated';
import { ComponentMap } from 'mdx-bundler/client';
import dynamic from 'next/dynamic';
import { useMDXComponent } from 'next-contentlayer/hooks';
import React from 'react';

import { coreContent } from '@/lib/contentlayer';

const Alert = dynamic(() => import('./Alert'));
const CustomImage = dynamic(() => import('./CustomImage'));
const CustomLink = dynamic(() => import('./CustomLink'));
const Pre = dynamic(() => import('./Pre'));
const BlogNewsletterForm = dynamic(() => import('./NewsletterForm'));

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
  wrapper: Wrapper,
  img: CustomImage,
  a: CustomLink,
  pre: Pre,
  Alert,
  BlogNewsletterForm,
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
