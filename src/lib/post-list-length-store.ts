import siteMetadata from 'data/site-metadata.mjs';

interface StoreType {
  [path: string]: number; // listLength
}

export const postListLengthStore = (() => {
  const store: StoreType = {};

  const setListLengthState = (path: string, listLength: number) => {
    store[path] = listLength;
  };

  const getListLengthState = (path: string) => {
    return (store[path] ??= siteMetadata.blogPost.postsPerScroll);
  };

  return {
    setListLengthState,
    getListLengthState,
  };
})();
