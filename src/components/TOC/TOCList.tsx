import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface Props {
  onClickAnchor?: () => void;
}
const TOCList = ({ onClickAnchor }: Props) => {
  const { headingEls, currentId } = useIntersectionObserver();

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
                    ? 'scale-105 text-primary-400 hover:text-primary-600 hover:dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-900 hover:dark:text-gray-200'
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

export default TOCList;
