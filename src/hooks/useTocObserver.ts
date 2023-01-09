import { useEffect, useRef, useState } from 'react';

import { TocElement } from '@/lib/types';

const observerOption = {
  threshold: 0.4,
  rootMargin: '-20px 0px 0px',
};

export const useTocObserver = () => {
  const [currentId, setCurrentId] = useState<string>('');
  const [headingEls, setHeadingEls] = useState<TocElement[]>([]);
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
          setCurrentId(entry.target.id);
        }
      });
    }, observerOption);

    const els = document.querySelectorAll('h2, h3');
    setHeadingEls(
      Array.from(els).map(({ id, nodeName, textContent }) => ({
        id,
        nodeName,
        textContent: textContent as string,
      }))
    );
    els.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return { currentId, headingEls };
};
