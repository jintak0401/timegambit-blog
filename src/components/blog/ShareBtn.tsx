import phrases from 'data/phrases';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { FaShareAlt } from 'react-icons/fa';

interface Props {
  title?: string;
  text?: string;
}

const ShareBtn = ({ title, text }: Props) => {
  const router = useRouter();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    else if (typeof navigator?.share !== 'undefined') return;
    ref.current.hidden = true;
  }, []);

  const onClick = () => {
    if (typeof navigator?.share === 'undefined') return;
    navigator.share({
      url: router.asPath,
      title,
      text,
    });
  };

  return (
    <button
      ref={ref}
      className="ml-auto flex flex-row items-center justify-center gap-1.5
       rounded-md bg-primary-200 px-2 py-1 text-sm text-gray-900 duration-200
       hover:bg-primary-400 hover:text-gray-100 dark:bg-primary-900
       dark:text-gray-300 dark:hover:bg-primary-600"
      onClick={onClick}
    >
      <FaShareAlt className="h-[14px] w-[14px]" />
      {phrases.Blog.share}
    </button>
  );
};

export default ShareBtn;
