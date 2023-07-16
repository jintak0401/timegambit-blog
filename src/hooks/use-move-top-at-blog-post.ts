import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const isBlogPost = (url: string) => /\/blog\/.+/.test(url);

export const useMoveTopAtBlogPost = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (isBlogPost(pathname)) {
      window.scrollTo({
        top: 0,
      });
    }
  }, [pathname]);
};
