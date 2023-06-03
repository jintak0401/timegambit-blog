import phrases from 'data/phrases';
import siteMetadata from 'data/site-metadata.mjs';

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
