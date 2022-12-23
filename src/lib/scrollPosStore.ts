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

  return {
    initScrollPosState,
    setListLengthState,
    setScrollPosState,
    getScrollPosState,
  };
})();
