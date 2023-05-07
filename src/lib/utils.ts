import siteMetadata from 'data/siteMetadata.mjs';

const getImageWithFallback = (
  url: string,
  fallbackUrl = `${siteMetadata.siteUrl}${url}`
) => {
  return url.startsWith('http') ? url : fallbackUrl;
};

const sameAllElements = (a: unknown[], b: unknown[]) => {
  if (a.length !== b.length) return false;
  return a.every((item, idx) => item === b[idx]);
};

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export { getImageWithFallback, isTouchDevice, sameAllElements };
