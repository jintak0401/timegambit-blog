import type { DocumentTypes } from 'contentlayer/generated';
import dynamic from 'next/dynamic';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { coreContent } from '@/lib/contentlayer';

import Alert from './Alert';
import CustomLink from './CustomLink';
import CustomMedia from './CustomMedia';
import Pre from './Pre';

const Logo = dynamic(() => import('data/logo/Logo'));

import { ComponentType } from 'react';

import PostLayout from '@/layouts/PostLayout';
import ProjectLayout from '@/layouts/ProjectLayout';

const LAYOUT_MAP: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ComponentType<any>;
} = {
  PostLayout,
  ProjectLayout,
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
  Alert,

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
