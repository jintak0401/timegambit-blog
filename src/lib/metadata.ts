import phrases from 'data/phrases';
import siteMetadata from 'data/site-metadata.mjs';

interface GenerateDefaultMetadataArgs {
  title: string;
  description: string;
  url: string;
  images?: string;
}

export const defaultOpenGraph = {
  url: siteMetadata.siteUrl,
  type: 'website',
  title: siteMetadata.title,
  siteName: siteMetadata.title,
  description: phrases.Seo.homeDesc || siteMetadata.description,
  locale: siteMetadata.locale,
  images: {
    url: siteMetadata.socialBanner,
    width: 1200,
    height: 630,
  },
};

export const defaultTwitter = {
  title: siteMetadata.title,
  description: phrases.Seo.homeDesc || siteMetadata.description,
  images: {
    url: siteMetadata.socialBanner,
    width: 1200,
    height: 630,
  },
  site: siteMetadata.twitter,
};

export const generateDefaultMetadata = ({
  title,
  description,
  url,
  images,
}: GenerateDefaultMetadataArgs) => {
  const ogTitle = siteMetadata.titleTemplate.replace('%s', title);
  const openGraph = {
    ...defaultOpenGraph,
    images: images ?? defaultOpenGraph.images,
    title: ogTitle,
    description,
    url,
  };
  const twitter = {
    ...defaultTwitter,
    title: ogTitle,
    description,
    images: images ?? defaultTwitter.images,
  };
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph,
    twitter,
  };
};
