import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const TOC = () => {
  const { headingEls, currentId } = useIntersectionObserver();

  return (
    <aside className="absolute left-full ">
      <ul className="fixed top-56 ml-12 hidden space-y-1.5 self-start border-l-2 pl-5 2xl:inline-block">
        {headingEls
          .filter(({ textContent }) => textContent !== 'Footnotes')
          .map(({ id, textContent, nodeName }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`inline-block transition-colors transition-transform hover:underline
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
