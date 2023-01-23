import siteMetaData from 'data/siteMetadata.mjs';
import NextImage from 'next/image';
import React from 'react';

import ErrorBoundary from '@/components/common/ErrorBoundary';
import Zoom from '@/components/Image/Zoom';

interface Props {
  src?: string;
  alt?: string;
}

const isVideo = (path?: string) => path && path.match(/\.(mp4|webm)$/);

const FallbackImage = ({ alt }: { alt: string }) => (
  <NextImage
    className="mx-auto w-auto max-w-full"
    src={siteMetaData.fallbackImage}
    alt={alt}
    width="1000"
    height="1000"
  />
);

const CustomMedia = ({ src, alt }: Props) => {
  return (
    <figure className="mb-6 space-y-2 md:space-y-3">
      {isVideo(src) ? (
        <video
          className="mx-auto w-auto max-w-full"
          src={src}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <ErrorBoundary fallback={<FallbackImage alt={alt as string} />}>
          <Zoom
            className="mx-auto w-auto max-w-full"
            priority={true}
            src={src as string}
            alt={alt as string}
            width="1000"
            height="1000"
          />
        </ErrorBoundary>
      )}
      <div className="middle-text text-center italic">{alt}</div>
    </figure>
  );
};

export default CustomMedia;
