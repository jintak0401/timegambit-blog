const getImageWithFallback = (url: string, fallbackUrl: string) =>
  url.startsWith('http') ? url : fallbackUrl;

const sameAllElements = (a: unknown[], b: unknown[]) => {
  if (a.length !== b.length) return false;
  return a.every((item, idx) => item === b[idx]);
};

export { getImageWithFallback, sameAllElements };
