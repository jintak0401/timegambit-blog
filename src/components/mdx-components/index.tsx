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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULT_LAYOUT: ComponentType<any> = PostLayout;
const LAYOUT_MAP: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ComponentType<any>;
} = {
  PostLayout,
  PostLayoutWithThumbnail,
};

interface MDXLayout {
  layout?: string;
  content: DocumentTypes;
  [key: string]: unknown;
}

const Wrapper = ({ layout, children, content, ...rest }: MDXLayout) => {
  const Layout =
    layout && layout in LAYOUT_MAP ? LAYOUT_MAP[layout] : DEFAULT_LAYOUT;

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
  Callout,

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
