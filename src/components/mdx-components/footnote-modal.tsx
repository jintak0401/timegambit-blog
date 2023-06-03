import { useEffect, useRef, useState } from 'react';

import phrases from 'data/phrases';

import { createPortal } from 'react-dom';

import useGetFootnoteBody from '@/hooks/use-get-footnote-body';

interface Props {
  onClose: () => void;
  idx: string;
}

const FootnoteModal = ({ onClose, idx }: Props) => {
  const element =
    typeof window !== 'undefined' && document.querySelector('#modal');
  const [opened, setOpened] = useState(true);
  const body = useGetFootnoteBody(idx);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const closeModal = () => {
    setOpened(false);
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      onClose();
    }, 100);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  return element && body
    ? createPortal(
        <div
          className={`animate-modal fixed left-0 top-0 z-50 h-screen w-screen bg-black bg-opacity-40 ${
            opened ? 'animate-modal-open' : 'animate-modal-close'
          }`}
          onClick={closeModal}
        >
          <div className="mx-auto flex max-w-3xl translate-y-[15vh] flex-col xl:max-w-5xl">
            <div
              className="prose max-h-[70vh] w-full max-w-none overflow-y-auto whitespace-normal rounded-t-sm bg-white px-3 py-4 scrollbar-hide dark:prose-dark dark:bg-gray-800"
              onClick={(e) => e.stopPropagation()}
              dangerouslySetInnerHTML={{ __html: body as string }}
            />
            <button
              onClick={closeModal}
              className="w-full rounded-b-sm border-t border-t-gray-200 bg-gray-100 py-2 text-sm dark:border-t-gray-900 dark:bg-gray-700 dark:text-gray-200"
            >
              {phrases.close}
            </button>
          </div>
        </div>,
        element
      )
    : null;
};

export default FootnoteModal;
