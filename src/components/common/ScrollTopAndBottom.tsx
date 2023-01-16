import { useEffect, useRef, useState } from 'react';

import throttle from '@/lib/throttle';

const MINIMUM_CONDITION = 200;
const THROTTLE_LIMIT = 100;

interface Props {
  goTop?: boolean;
  goBottom?: boolean;
}

const ScrollTopAndBottom = ({ goTop = true, goBottom = true }: Props) => {
  const [show, setShow] = useState(false);
  const commentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const throttleHandleScroll = throttle(() => {
      if (window.scrollY > MINIMUM_CONDITION) setShow(true);
      else setShow(false);
    }, THROTTLE_LIMIT);

    window.addEventListener('scroll', throttleHandleScroll);
    return () => window.removeEventListener('scroll', throttleHandleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleScrollToComment = () => {
    if (!commentRef.current) {
      commentRef.current = document.getElementById('comment');
    }
    commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div
      className={`fixed right-3 bottom-3 z-20 flex flex-col gap-2 opacity-60 md:right-8 md:bottom-8 md:opacity-100 ${
        show ? '' : 'hidden'
      }`}
    >
      {goTop && (
        <button
          aria-label="Scroll To Top"
          type="button"
          onClick={handleScrollTop}
          className="middle-text rounded-full bg-gray-200 p-2 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <svg
            className="h-5 w-5 md:h-6 md:w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      {goBottom && (
        <button
          aria-label="Scroll To Bottom"
          type="button"
          onClick={handleScrollToComment}
          className="middle-text rounded-full bg-gray-200 p-2 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <svg
            className="h-5 w-5 md:h-6 md:w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
            overflow="visible"
          >
            <path
              fillRule="evenodd"
              d="M16.708,10.294c.39,.39,.39,1.023,0,1.414l-6.001,6.001c-.39,.39-1.023,.39-1.414,0L3.293,11.708c-.384-.397-.373-1.03,.025-1.414,.388-.374,1.002-.374,1.389,0l4.293,4.293V3c0-.552,.448-1,1-1s1,.448,1,1V14.587l4.293-4.293c.391-.39,1.024-.39,1.414,0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ScrollTopAndBottom;
