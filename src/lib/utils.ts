import siteMetadata from 'data/site-metadata.mjs';

export const getImageWithFallback = (
  url: string,
  fallbackUrl = `${siteMetadata.siteUrl}${url}`
) => {
  return url.startsWith('http') ? url : fallbackUrl;
};

export const sameAllElements = (a: unknown[], b: unknown[]) => {
  if (a.length !== b.length) return false;
  return a.every((item, idx) => item === b[idx]);
};

export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const joinSlugs = (slug: string | string[] = []) => {
  return Array.isArray(slug) ? slug.join('/') : slug;
};
