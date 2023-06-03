import siteMetadata from 'data/siteMetadata.mjs';

interface StoreElement {
  scrollPos: number;
  listLength: number;
}

interface StoreType {
  [path: string]: StoreElement;
}

export const scrollPosStore = (() => {
  const store: StoreType = {};

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

  const initScrollPosState = (
    path: string,
    storeElement?: { scrollPos?: number; listLength?: number }
  ) => {
    const { scrollPos = 0, listLength = siteMetadata.blogPost.postsPerScroll } =
      storeElement || {};
    store[path] = {
      scrollPos,
      listLength,
    };
  };
  const setListLengthState = (path: string, listLength: number) => {
    if (!store[path]) {
      initScrollPosState(path, { listLength });
    }
    store[path].listLength = listLength;
  };

  const setScrollPosState = (path: string, scrollPos: number) => {
    if (!store[path]) {
      initScrollPosState(path, { scrollPos });
    }
    store[path].scrollPos = scrollPos;
  };

  const getScrollPosState = (path: string) => {
    if (!store[path]) {
      initScrollPosState(path);
    }
    return store[path];
  };

  const onStartRouteCb = (before: string, after: string) => {
    if (isNeedRestoreScroll(after)) {
      initScrollPosState(after);
    }
    if (isNeedRestoreScroll(before)) {
      setScrollPosState(before, window.scrollY);
    }
  };

  const onCompleteRouteCb = (after: string) => {
    if (isNeedRestoreScroll(after)) {
      window.scrollTo({
        top: getScrollPosState(after).scrollPos,
      });
    }
  };

  return {
    initScrollPosState,
    setListLengthState,
    setScrollPosState,
    getScrollPosState,
    onStartRouteCb,
    onCompleteRouteCb,
  };
})();
