import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

import { useScrollDirection } from '@/hooks/useScrollDirection';

import TOCList from '@/components/TOCList';

const SmallWidthTOC = () => {
  const scrollDirection = useScrollDirection();
  const [tocShow, setTocShow] = useState(false);

  return (
    <div className="2xl:hidden">
      <button
        className={`sm:top-13 fixed right-0 top-14 rounded-l-md border-y-2 border-l-2 border-primary-700 bg-primary-500 
        px-2 py-1 text-gray-100 duration-500 dark:border-primary-500 dark:bg-primary-700 dark:text-gray-200
        ${scrollDirection === 'down' ? '-right-[50px]' : 'right-0'} 
        `}
        onClick={() => setTocShow(true)}
      >
        TOC
      </button>
      <article
        className={`sm:top-13 fixed top-[56px] h-5/6 w-80 overflow-y-scroll rounded-l-lg 
        border-y-2 border-l-2 border-primary-700 bg-white duration-500 scrollbar-hide 
        dark:bg-gray-900 ${tocShow ? 'right-0' : '-right-80'}
        `}
      >
        <button
          className="sticky left-full top-0"
          onClick={() => setTocShow(false)}
        >
          <IoCloseSharp
            className="h-8 w-8 rounded-bl-md border-l-2 border-b-2 border-primary-700
            bg-primary-500 text-gray-100 dark:text-gray-200"
          />
        </button>
        <div className="-mt-5 text-center text-2xl text-gray-300 duration-500 dark:text-gray-800">
          Table of Contents
        </div>
        <ul className="space-y-1.5 p-5 transition-colors">
          <TOCList onClickAnchor={() => setTocShow(false)} />
        </ul>
      </article>
    </div>
  );
};

export default SmallWidthTOC;
