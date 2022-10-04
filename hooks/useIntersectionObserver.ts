import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

const observerOption = {
  threshold: 0.4,
  rootMargin: '-90px 0px 0px 0px',
};

export const useIntersectionObserver = (
  setId: Dispatch<SetStateAction<string>>
) => {
  const dirRef = useRef<string>('');
  const prevYpos = useRef<number>(0);

  // scroll 방향 check function
  const checkScrollDirection = (prevY: number) => {
    if (window.scrollY === 0 && prevY === 0) return;
    dirRef.current = window.scrollY > prevY ? 'down' : 'up';
    prevYpos.current = window.scrollY;
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        checkScrollDirection(prevYpos.current);
        if (
          (dirRef.current === 'down' && !entry.isIntersecting) ||
          (dirRef.current === 'up' && entry.isIntersecting)
        ) {
          setId(entry.target.id);
        }
      });
    }, observerOption);

    const headingEls = document.querySelectorAll('h2, h3');
    headingEls.forEach((h) => observer.observe(h));

    return () => observer.disconnect();
  }, [setId]);
};
