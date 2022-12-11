import NextImage from 'next/image';
import React from 'react';

import siteMetaData from '@/data/siteMetadata';

import ErrorBoundary from '@/components/common/ErrorBoundary';
import Zoom from '@/components/Image/Zoom';

interface Props {
  src?: string;
  alt?: string;
}

const FallbackImage = ({ alt }: { alt: string }) => (
  <NextImage
    className="mx-auto w-auto max-w-full"
    src={siteMetaData.fallbackImage}
    alt={alt}
    width="1000"
    height="1000"
  />
);

const CustomImage = ({ src, alt }: Props) => {
  return (
    <div className="mb-6 space-y-2 md:space-y-3">
      <ErrorBoundary fallback={<FallbackImage alt={alt as string} />}>
        <Zoom
          className="mx-auto w-auto max-w-full"
          loading="lazy"
          placeholder="blur"
          blurDataURL={`/_next/image?url=${src}&w=16&q=1`}
          src={src as string}
          alt={alt as string}
          width="1000"
          height="1000"
        />
      </ErrorBoundary>
      <div className="middle-text text-center italic">{alt}</div>
    </div>
  );
};

export default CustomImage;
