import siteMetadata from 'data/siteMetadata.mjs';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { scrollPosStore } from '@/lib/scrollPosStore';

const needRestoreScrollRegs = (() => {
  const convertUrl2Regs = (url: string) => {
    const regStr = url.replace(/\[.+\]/gi, '.+');
    return new RegExp(regStr);
  };
  return siteMetadata.needRestoreScrollPosPage.map(convertUrl2Regs);
})();

const isNeedRestoreScroll = (asPath: string) => {
  return needRestoreScrollRegs.some((reg) => reg.test(asPath));
};

// When user does going back or forward, it restores scroll position if it needs.
const useRestoreScrollPos = () => {
  const router = useRouter();
  const { getScrollPosState, setScrollPosState, initScrollPosState } =
    scrollPosStore;
  const isPopState = useRef(false);
  const beforePath = useRef(router.asPath);
  const afterPath = useRef(router.asPath);

  useEffect(() => {
    router.beforePopState(({ as }) => {
      isPopState.current = true;
      beforePath.current = router.asPath;
      afterPath.current = as;
      return beforePath.current !== afterPath.current;
    });

    const onRouteChangeStart = (asPath: string) => {
      beforePath.current = router.asPath;
      afterPath.current = asPath;
      if (!isPopState.current && isNeedRestoreScroll(afterPath.current)) {
        initScrollPosState(afterPath.current);
      }
      if (isNeedRestoreScroll(beforePath.current)) {
        setScrollPosState(beforePath.current, window.scrollY);
      }
    };

    const onRouteChangeComplete = () => {
      if (isPopState.current && isNeedRestoreScroll(afterPath.current)) {
        window.scrollTo({
          top: getScrollPosState(afterPath.current).scrollPos,
        });
      }
      isPopState.current = false;
    };

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
};

export default useRestoreScrollPos;
