import { useEffect, useRef, useState } from 'react';

import throttle from '@/lib/throttle';

export const useScrollDirection = () => {
  const isClient = typeof window === 'object';
  const getScrollYPos = () => (isClient ? window.scrollY : undefined);

  const scrollYPos = useRef(0);
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const newY = getScrollYPos() as number;
      setScrollDirection(scrollYPos.current > newY ? 'up' : 'down');
      scrollYPos.current = getScrollYPos() as number;
    };

    const throttleHandleScroll = throttle(handleScroll, 100);

    window.addEventListener('scroll', throttleHandleScroll);
    return () => window.removeEventListener('scroll', throttleHandleScroll);
  }, []);

  return scrollDirection;
};
