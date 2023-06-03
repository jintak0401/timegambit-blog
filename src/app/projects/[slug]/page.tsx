import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import siteMetadata from 'data/site-metadata.mjs';

import { allProjects, Project } from 'contentlayer/generated';

import { getImageWithFallback } from '@/lib/utils';

import { MDXLayoutRenderer } from '@/components/mdx-components';

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
    },
  };
};

const getJsonLd = (post: Project) => {
  const url =
    post.canonicalUrl || `${siteMetadata.siteUrl}/projects/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: post.title,
    description: post.summary,
    image: post.images?.length
      ? post.images.map((imageUrl) => ({
          '@type': 'ImageObject',
          url: getImageWithFallback(imageUrl),
        }))
      : siteMetadata.socialBanner,
    author: {
      '@type': 'Person',
      name: siteMetadata.author,
      url,
    },
    publisher: {
      '@type': 'Person',
      name: siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: getImageWithFallback(
          siteMetadata.siteLogo,
          `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`
        ),
      },
    },
  };
};

const ProjectPost = ({ params: { slug } }: Props) => {
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(post)) }}
      />
      <MDXLayoutRenderer
        layout={post['layout'] || DEFAULT_LAYOUT}
        content={post}
      />
    </>
  );
};

export default ProjectPost;
