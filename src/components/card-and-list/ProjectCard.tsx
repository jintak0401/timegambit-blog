'use client';

import { useState } from 'react';

import phrases from 'data/phrases';

import NavLink from '@/components/common/nav-link';
import ImageWithFallback from '@/components/Image/ImageWithFallback';

interface Props {
  title: string;
  description: string;
  imgSrc: string;
  href: string;
}

const ProjectCard = ({ title, description, imgSrc, href }: Props) => {
  const [loaded, setLoaded] = useState(false);

  const CardImage = () => (
    <ImageWithFallback
      src={imgSrc}
      alt={title}
      className="aspect-video object-cover"
      onLoadingComplete={() => {
        setLoaded(true);
      }}
    />
  );

  return (
    <div className={`p-4 md:w-1/2 ${loaded ? 'animate-card' : 'opacity-0'}`}>
      <div
        className={`overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700 ${
          imgSrc ? 'h-full' : 'h-0'
        }`}
      >
        {imgSrc &&
          (href ? (
            <NavLink href={href} aria-label={`Link to ${title}`}>
              <CardImage />
            </NavLink>
          ) : (
            <CardImage />
          ))}
        <div className="p-6">
          <h2 className="strong-text mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <NavLink href={href} aria-label={`Link to ${title}`}>
                {title}
              </NavLink>
            ) : (
              title
            )}
          </h2>
          <p className="middle-text prose mb-3 max-w-none">{description}</p>
          {href && (
            <NavLink
              href={href}
              aria-label={`Link to ${title}`}
              className="primary-color-text font-medium leading-6"
            >
              {phrases.Project.learnMore} &rarr;
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
