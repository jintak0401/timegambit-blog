const getImageWithFallback = (url: string, fallbackUrl: string) =>
  url.startsWith('http') ? url : fallbackUrl;

export { getImageWithFallback };
