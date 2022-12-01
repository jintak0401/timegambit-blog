import { useEffect, useState } from 'react';

const ScrollIndicator = () => {
  const [pageHeight, setPageHeight] = useState(1000000);
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onResize = () => {
      setPageHeight(document.body.scrollHeight - document.body.clientHeight);
    };
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    onResize();
    onScroll();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-30 h-1 w-full">
      <div
        className={`h-full bg-primary-600 dark:bg-primary-500 `}
        style={{ width: `${(scrollY / pageHeight) * 100}%` }}
      />
    </div>
  );
};

export default ScrollIndicator;
