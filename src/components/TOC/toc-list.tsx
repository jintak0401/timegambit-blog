'use client';

import { useTocObserver } from '@/hooks/use-toc-observer';

interface Props {
  onClickAnchor?: () => void;
}
const TocList = ({ onClickAnchor }: Props) => {
  const { headingEls, currentId } = useTocObserver();

  return (
    <>
      {headingEls
        .filter(({ textContent }) => textContent !== 'Footnotes')
        .map(({ id, textContent, nodeName }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={onClickAnchor}
              className={`inline-block transition-all hover:underline
                ${
                  currentId === id
                    ? 'scale-105 text-primary-400 hover:text-primary-600 dark:hover:text-primary-400'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                }
                ${nodeName === 'H3' && 'pl-4'}
                `}
            >
              {textContent}
            </a>
          </li>
        ))}
    </>
  );
};

export default TocList;
