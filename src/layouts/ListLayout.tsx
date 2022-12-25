import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import { filterBlogPosts } from '@/lib/contentlayer';
import { scrollPosStore } from '@/lib/scrollPosStore';
import { PostListItem } from '@/lib/types';
import { sameAllElements } from '@/lib/utils';
import useDebounce from '@/hooks/useDebounce';
import useInfiniteScrollObserver from '@/hooks/useInfiniteScrollObserver';
import useIsFirstRender from '@/hooks/useIsFirstRender';

import PostList from '@/components/card-and-list/PostList';
import ScrollTopAndBottom from '@/components/common/ScrollTopAndBottom';

interface Props {
  posts: PostListItem[];
  title: string;
  description?: string;
}

export default function ListLayout({ posts, title, description }: Props) {
  const router = useRouter();
  const { getScrollPosState, setListLengthState } = scrollPosStore;
  const { listLength } = getScrollPosState(router.pathname);
  const infScrollRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useIsFirstRender();
  const [searchValue, setSearchValue] = useState('');
  const [displayPosts, setDisplayPosts] = useState<PostListItem[]>(() => {
    return posts.slice(0, listLength);
  });

  useEffect(() => {
    setSearchValue('');
    setDisplayPosts((prev) => {
      const nextState = sameAllElements(prev, posts)
        ? prev
        : posts.slice(0, siteMetadata.blogPost.postsPerScroll);
      setListLengthState(router.pathname, nextState.length);
      return nextState;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const setNextDisplayPosts = (init = false) => {
    setDisplayPosts((prev) => {
      const _posts = filterBlogPosts(posts, searchValue);
      const nextPosts = _posts.slice(
        0,
        (init ? 0 : prev.length) + siteMetadata.blogPost.postsPerScroll
      );

      const nextState = sameAllElements(nextPosts, prev) ? prev : nextPosts;
      setListLengthState(router.pathname, nextState.length);
      return nextState;
    });
  };

  useDebounce(() => !isFirstRender && setNextDisplayPosts(true), 300, [
    searchValue,
  ]);

  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      entry.isIntersecting && setNextDisplayPosts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchValue, posts]
  );

  useInfiniteScrollObserver({
    target: infScrollRef,
    onIntersect: onIntersect,
  });

  return (
    <>
      <ScrollTopAndBottom goBottom={false} />
      <div className="divide-y">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="basic-text text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          {description && <p className="text-gray-500">{description}</p>}
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={phrases.Blog.search}
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-colors duration-500 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div>
          <PostList posts={displayPosts} />
          <div ref={infScrollRef} />
        </div>
      </div>
    </>
  );
}
