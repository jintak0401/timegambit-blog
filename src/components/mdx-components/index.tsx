import { ComponentType } from 'react';
import dynamic from 'next/dynamic';

import type { DocumentTypes } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { coreContent } from '@/lib/contentlayer';

import PostLayout from '@/layouts/post-layout';
import PostLayoutWithThumbnail from '@/layouts/post-layout-with-thumbnail';

import Callout from './callout';
import CustomLink from './custom-link';
import CustomMedia from './custom-media';
import Pre from './pre';

const Logo = dynamic(() => import('data/logo/Logo'));

const LAYOUT_MAP: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ComponentType<any>;
} = {
  PostLayout,
  PostLayoutWithThumbnail,
};

interface MDXLayout {
  layout: string;
  content: DocumentTypes;
  [key: string]: unknown;
}

const Wrapper = ({ layout, children, content, ...rest }: MDXLayout) => {
  const Layout = LAYOUT_MAP[layout as keyof typeof LAYOUT_MAP];
  return (
    <Layout content={content} {...rest}>
      {children}
    </Layout>
  );
};

export const MDXComponents = {
  wrapper: Wrapper,
  img: CustomMedia,
  a: CustomLink,
  pre: Pre,
  Alert: Callout,

  // dynamic import
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
