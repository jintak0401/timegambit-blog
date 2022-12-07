import type { Blog } from 'contentlayer/generated';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { CoreContent } from '@/lib/contentlayer';
import { getImageWithFallback } from '@/lib/utils';

import siteMetadata from '@/data/siteMetadata';

interface CommonSEOProps {
  title: string;
  description: string;
  ogType: string;
  ogImage:
    | string
    | {
        '@type': string;
        url: string;
      }[];
  twImage: string;
  canonicalUrl?: string;
}

const CommonSEO = ({
  title,
  description,
  ogType,
  ogImage,
  twImage,
  canonicalUrl,
}: CommonSEOProps) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta
        property="og:url"
        content={`${siteMetadata.siteUrl}${router.asPath}`}
      />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {Array.isArray(ogImage) ? (
        ogImage.map(({ url }) => (
          <meta property="og:image" content={url} key={url} />
        ))
      ) : (
        <meta property="og:image" content={ogImage} key={ogImage} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      {siteMetadata.twitter && (
        <meta name="twitter:site" content={siteMetadata.twitter} />
      )}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
      <link
        rel="canonical"
        href={
          canonicalUrl
            ? canonicalUrl
            : `${siteMetadata.siteUrl}${router.asPath}`
        }
      />
    </Head>
  );
};

interface PageSEOProps {
  title: string;
  description: string;
  image?: string;
}

export const PageSEO = ({ title, description, image }: PageSEOProps) => {
  const ogImageUrl =
    image ||
    getImageWithFallback(
      siteMetadata.socialBanner,
      siteMetadata.siteUrl + siteMetadata.socialBanner
    );
  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImageUrl}
      twImage={ogImageUrl}
    />
  );
};

export const TagSEO = ({ title, description }: PageSEOProps) => {
  const ogImageUrl = getImageWithFallback(
    siteMetadata.socialBanner,
    siteMetadata.siteUrl + siteMetadata.socialBanner
  );
  const router = useRouter();
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        twImage={ogImageUrl}
      />
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${description} - RSS feed`}
          href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  );
};

interface BlogSeoProps extends CoreContent<Blog> {
  url: string;
}

export const BlogSEO = ({
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
  canonicalUrl,
}: BlogSeoProps) => {
  const publishedAt = new Date(date).toISOString();
  const modifiedAt = new Date(lastmod || date).toISOString();
  const imagesArr =
    images.length === 0
      ? [siteMetadata.socialBanner]
      : typeof images === 'string'
      ? [images]
      : images;

  const featuredImages = imagesArr.map((img) => {
    return {
      '@type': 'ImageObject',
      url: getImageWithFallback(img, `${siteMetadata.siteUrl}${img}`),
    };
  });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: {
      '@type': 'Person',
      name: siteMetadata.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: getImageWithFallback(
          siteMetadata.siteLogo,
          `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`
        ),
      },
    },
    description: summary,
  };

  const twImageUrl = featuredImages[0].url;

  return (
    <>
      <CommonSEO
        title={title}
        description={summary || siteMetadata.description}
        ogType="article"
        ogImage={siteMetadata.siteUrl + siteMetadata.socialBanner}
        twImage={siteMetadata.siteUrl + siteMetadata.socialBanner}
        canonicalUrl={canonicalUrl}
      />
      <Head>
        {date && (
          <meta property="article:published_time" content={publishedAt} />
        )}
        {lastmod && (
          <meta property="article:modified_time" content={modifiedAt} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  );
};
