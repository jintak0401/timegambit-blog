import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import siteMetadata from 'data/siteMetadata.mjs';

import { allProjects, Project } from 'contentlayer/generated';

import { MDXLayoutRenderer } from '@/components/mdxComponents/MDXComponents';

const DEFAULT_LAYOUT = 'PostLayout';

interface Props {
  params: {
    slug: string;
  };
}

export const generateStaticParams = () => {
  return allProjects.map(({ slug }) => ({
    slug,
  }));
};

const getPost = (slug: string) => {
  const post = allProjects.find((p) => p.slug === slug) as Project;
  post?.body?.raw && (post.body.raw = '');
  return post;
};

export const generateMetadata = ({ params: { slug } }: Props): Metadata => {
  const post = getPost(slug);

  if (!post) {
    return {};
  }

  const images = post.images?.map((image) => ({
    url: image,
    alt: post.title,
  }));
  const description = post.summary || siteMetadata.description;
  const url =
    post.canonicalUrl || `${siteMetadata.siteUrl}/projects/${post.slug}`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      type: 'article',
      title: post.title,
      description,
      images,
    },
    twitter: {
      title: post.title,
      description,
      images,
      site: siteMetadata.twitter,
    },
  };
};

const ProjectPost = ({ params: { slug } }: Props) => {
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <MDXLayoutRenderer
      layout={post['layout'] || DEFAULT_LAYOUT}
      content={post}
    />
  );
};

export default ProjectPost;
