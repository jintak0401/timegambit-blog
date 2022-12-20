import Link from 'next/link';
import { useCallback, useState } from 'react';

import ImageWithFallback from '@/components/Image/ImageWithFallback';

interface Props {
  title: string;
  description: string;
  imgSrc: string;
  href: string;
}

const ProjectCard = ({ title, description, imgSrc, href }: Props) => {
  const [loaded, setLoaded] = useState(false);

  const CardImage = useCallback(
    () => (
      <ImageWithFallback
        src={imgSrc}
        alt={title}
        className="object-cover object-center"
        width="1778"
        height="1000"
        onLoadingComplete={() => {
          setLoaded(true);
        }}
      />
    ),
    [imgSrc, title]
  );

  return (
    <div className={`p-4 md:w-1/2 ${loaded ? 'animate-card' : 'opacity-0'}`}>
      <div
        className={`${
          imgSrc && 'h-full'
        }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        {imgSrc &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <CardImage />
            </Link>
          ) : (
            <CardImage />
          ))}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
            {description}
          </p>
          {href && (
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              className="primary-color-text text-base font-medium leading-6"
            >
              Learn more &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
