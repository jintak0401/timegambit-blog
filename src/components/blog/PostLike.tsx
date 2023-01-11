import siteMetadata from 'data/siteMetadata.mjs';
import { useEffect, useRef, useState } from 'react';

import { usePostLikes } from '@/hooks/usePostLikes';

interface Props {
  slug: string;
}

const emojis = ['❤️', '😘', '🥰', '😍'];
const HEART_START_POS = 18,
  HEART_END_POS = 4;

const convertLike2PosY = (like?: number) =>
  like
    ? (like / siteMetadata.blogPost.maxLikeCount) *
        (HEART_END_POS - HEART_START_POS) +
      HEART_START_POS
    : HEART_START_POS;

const PostLike = ({ slug }: Props) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const { userLikes, postLikes, increment, isLoading } = usePostLikes(slug);
  const [clicked, setClicked] = useState(false);

  const [posY, setPosY] = useState(convertLike2PosY(userLikes));

  useEffect(() => {
    if (userLikes && posY > convertLike2PosY(userLikes)) {
      timeout.current && clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setPosY((prev) => prev - 0.2), 5);
    }
    return () => timeout.current && clearTimeout(timeout.current);
  }, [userLikes, posY]);

  return (
    <div className="mb-10 w-full lg:absolute lg:right-full lg:top-0 lg:mr-12 lg:h-full lg:w-fit">
      <div className="flex w-full items-center justify-center gap-x-1 dark:border-gray-700 lg:sticky lg:top-10 lg:w-fit lg:flex-col lg:border-r-2 lg:py-2 lg:pr-3">
        <button
          onClick={increment}
          onMouseDown={() => setClicked(true)}
          onTouchStart={() => setClicked(true)}
          onMouseUp={() => setClicked(false)}
          onTouchEnd={() => setClicked(false)}
          className="relative"
          aria-label="like button"
          type="button"
        >
          <div className="absolute w-full text-center text-lg">
            {emojis.map((item, idx) => (
              <div
                key={idx}
                className={`absolute w-full ${
                  (userLikes - 1) % emojis.length === idx
                    ? 'animate-emoji'
                    : 'hidden'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <svg
            viewBox="0 0 20 20"
            className={`h-12 w-12 ${clicked ? 'translate-y-px' : ''} ${
              userLikes === siteMetadata.blogPost.maxLikeCount
                ? 'animate-heart'
                : ''
            }`}
            onMouseDown={() => setClicked(true)}
            onMouseUp={() => setClicked(false)}
          >
            <defs>
              <linearGradient
                id="post-like-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="20%" className="post-like-first-grad" />
                <stop offset="80%" className="post-like-second-grad" />
              </linearGradient>
              <mask
                id="mask"
                maskUnits="userSpaceOnUse"
                style={{ maskType: 'alpha' }}
              >
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </mask>
            </defs>
            <g mask="url(#mask)">
              <rect
                width="20"
                height="20"
                className="fill-current text-[#c4c1c1] dark:text-[#4b5563]"
              />
              <rect
                fill="url(#post-like-grad)"
                width="20"
                height="20"
                x="0"
                y={posY}
              />
            </g>
          </svg>
        </button>
        {isLoading ? (
          <div className="my-1 h-6 w-10 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        ) : (
          <div className="strong-text my-1 flex h-6 w-10 items-center justify-center text-2xl font-semibold duration-500">
            {postLikes}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostLike;
