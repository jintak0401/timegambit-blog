import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import siteMetadata from 'data/site-metadata.mjs';

import { allBlogs, Blog } from 'contentlayer/generated';

import { coreContent, sortedBlogPost } from '@/lib/contentlayer';
import { isProd } from '@/lib/is-production';
import { defaultOpenGraph, defaultTwitter } from '@/lib/metadata';
import { getImageWithFallback } from '@/lib/utils';

import PageTitle from '@/components/blog/page-title';
import { MDXLayoutRenderer } from '@/components/mdx-components';

const DEFAULT_LAYOUT = 'PostLayout';

interface Props {
  params: {
    slug: string[];
  };
}

export const dynamicParams = false;
export const generateStaticParams = () => {
  return allBlogs.map(({ slug }) => ({
    slug: slug.split('/'),
  }));
};

export const generateMetadata = ({ params }: Props): Metadata => {
  const slug = params.slug.join('/');
  const post = allBlogs.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  const url = post.canonicalUrl || `${siteMetadata.siteUrl}/blog/${slug}`;
  const description = post.summary || siteMetadata.description;
  const images = post.images?.map((image) => ({
    url: image,
  }));
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = new Date(post.lastmod || post.date).toISOString();

  return {
    title: post.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...defaultOpenGraph,
      url,
      type: 'article',
      title: post.title,
      description,
      images,
      publishedTime,
      modifiedTime,
    },
    twitter: {
      ...defaultTwitter,
      title: post.title,
      description,
      images,
    },
  };
};

const getPost = (slug: string) => {
  const post = allBlogs.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  post.body.raw = '';

  // If post is included in category, sortedPosts are category posts
  const sortedPosts = sortedBlogPost(
    post?.series
      ? allBlogs.filter((p) => p.series === post.series)
      : allBlogs.filter((p) => !p.series),
    true
  );
  const series = post.series
    ? sortedPosts
        .filter((p) => !p.draft)
        .map((p) => ({ title: p.title, slug: p.slug }))
    : null;

  const seriesTitle = post.series ?? null;

  // prev and next will be a post which draft === false
  const postIndex = sortedPosts.findIndex((p) => p.slug === slug);
  let prevIndex = postIndex - 1,
    nextIndex = postIndex + 1,
    prev = null,
    next = null;
  for (; prevIndex >= 0; prevIndex--) {
    const { draft, title, slug } = coreContent(sortedPosts[prevIndex]);
    if (!draft) {
      prev = { title, slug };
      break;
    }
  }
  for (; nextIndex < sortedPosts.length; nextIndex++) {
    const { draft, title, slug } = coreContent(sortedPosts[nextIndex]);
    if (!draft) {
      next = { title, slug };
      break;
    }
  }

  return {
    post,
    prev,
    next,
    series,
    seriesTitle,
  };
};

const getJsonLd = (post: Blog) => {
  const url = post.canonicalUrl || `${siteMetadata.siteUrl}/blog/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: post.title,
    description: post.summary,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.lastmod || post.date).toISOString(),
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

const BlogPostPage = ({ params }: Props) => {
  const slug = params.slug.join('/');
  const { post, prev, next, series, seriesTitle } = getPost(slug);

  if (!post) {
    notFound();
  } else if (post.draft !== true || !isProd) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(post)) }}
        />
        <MDXLayoutRenderer
          layout={post.layout}
          content={post}
          prev={prev}
          next={next}
          seriesTitle={seriesTitle}
          series={series}
        />
      </>
    );
  }

  return (
    <>
      <div className="mt-24 text-center">
        <PageTitle>
          Under Construction{' '}
          <span role="img" aria-label="roadwork sign">
            🚧
          </span>
        </PageTitle>
      </div>
    </>
  );
};

export default BlogPostPage;
