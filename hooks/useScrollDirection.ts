import { useEffect, useRef, useState } from 'react';

import throttle from '@/lib/throttle';

export const useScrollDirection = () => {
  const scrollYPos = useRef(0);
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    const handleScroll = () => {
      const newY = window.scrollY;
      setScrollDirection(scrollYPos.current > newY ? 'up' : 'down');
      scrollYPos.current = window.scrollY;
    };

    const throttleHandleScroll = throttle(handleScroll, 100);

    window.addEventListener('scroll', throttleHandleScroll);
    return () => window.removeEventListener('scroll', throttleHandleScroll);
  }, []);

  return scrollDirection;
};
