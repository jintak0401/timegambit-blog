import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const TOC = () => {
  const { headingEls, currentId } = useIntersectionObserver();

  return (
    <aside className="absolute top-0 left-full hidden h-full break-words 2xl:inline-block">
      <ul className="sticky top-10 ml-12 w-[calc(49vw-555px)] space-y-1.5 border-l-2 pl-5 transition-colors dark:border-gray-700">
        {headingEls
          .filter(({ textContent }) => textContent !== 'Footnotes')
          .map(({ id, textContent, nodeName }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`inline-block transition-all hover:underline
                ${
                  currentId === id
                    ? 'scale-105 text-primary-500 hover:text-primary-600 hover:dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-900 hover:dark:text-gray-200'
                }
                ${nodeName === 'H3' && 'pl-4'}
                `}
              >
                {textContent}
              </a>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default TOC;
