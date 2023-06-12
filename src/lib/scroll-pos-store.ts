import siteMetadata from 'data/site-metadata.mjs';

interface StoreElement {
  scrollPos: number;
  listLength?: number;
}

interface StoreType {
  [path: string]: number;
}

const isBlogPost = (url: string) => /\/blog\/.+/.test(url);

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

  const initScrollPosState = (path: string, listLength: number) => {
    store[path] = listLength;
  };
  const setListLengthState = (path: string, listLength: number) => {
    store[path] = listLength;
  };

  const getScrollPosState = (path: string) => {
    return (store[path] ??= siteMetadata.blogPost.postsPerScroll);
  };

  const onCompleteRouteCb = (after: string) => {
    console.log(store);
    if (isBlogPost(after)) {
      window.scrollTo({
        top: 0,
      });
    }
  };

  return {
    initScrollPosState,
    setListLengthState,
    getScrollPosState,
    onCompleteRouteCb,
  };
})();
