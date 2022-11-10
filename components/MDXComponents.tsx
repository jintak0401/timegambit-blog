import type { Blog } from 'contentlayer/generated';
import { ComponentMap } from 'mdx-bundler/client';
import { useMDXComponent } from 'next-contentlayer/hooks';
import React from 'react';

import { coreContent } from '@/lib/contentlayer';

import Image from './Image';
import CustomLink from './Link';
import { BlogNewsletterForm } from './NewsletterForm';
import Pre from './Pre';

interface MDXLayout {
  layout: string;
  content: Blog;
  [key: string]: unknown;
}

const Wrapper = ({ layout, content, ...rest }: MDXLayout) => {
  const Layout = require(`../layouts/${layout}`).default;
  return <Layout content={content} {...rest} />;
};

export const MDXComponents: ComponentMap = {
  Image,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
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
