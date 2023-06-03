'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';

import { filterBlogPosts } from '@/lib/contentlayer';
import { scrollPosStore } from '@/lib/scroll-pos-store';
import { sameAllElements } from '@/lib/utils';
import useDebounce from '@/hooks/use-debounce';
import useInfiniteScrollObserver from '@/hooks/use-infinite-scroll-observer';
import useIsFirstRender from '@/hooks/useIsFirstRender';

import PostList from '@/components/card-and-list/post-list';
import ScrollTopAndBottom from '@/components/common/scroll-top-and-bottom';

import { PostListItem } from '@/types';

interface Props {
  posts: PostListItem[];
  title: string;
  description?: string;
}

export default function ListLayout({ posts, title, description }: Props) {
  const pathname = usePathname();
  const { getScrollPosState, setListLengthState } = scrollPosStore;
  const { listLength } = getScrollPosState(pathname);
  const infScrollRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useIsFirstRender();
  const [searchValue, setSearchValue] = useState('');
  const [displayPosts, setDisplayPosts] = useState<PostListItem[]>(() => {
    return posts.slice(0, listLength);
  });
  const [postsLength, setPostsLength] = useState(posts.length);

  useEffect(() => {
    setSearchValue('');
    setDisplayPosts((prev) => {
      const nextState = sameAllElements(prev, posts)
        ? prev
        : posts.slice(0, siteMetadata.blogPost.postsPerScroll);
      setListLengthState(pathname, nextState.length);
      return nextState;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  //
  const setNextDisplayPosts = (init = false) => {
    const _posts = filterBlogPosts(posts, searchValue);
    setPostsLength(_posts.length);
    setDisplayPosts((prev) => {
      const nextPosts = _posts.slice(
        0,
        (init ? 0 : prev.length) + siteMetadata.blogPost.postsPerScroll
      );

      const nextState = sameAllElements(nextPosts, prev) ? prev : nextPosts;
      setListLengthState(pathname, nextState.length);
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
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="strong-text text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title} ({postsLength})
          </h1>
          {description && (
            <p className="middle-text text-lg leading-7">{description}</p>
          )}
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={phrases.Blog.search}
              className="duration-default strong-text block w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800"
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
