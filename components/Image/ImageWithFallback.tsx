import NextImage, { ImageProps } from 'next/image';
import { useState } from 'react';

import siteMetaData from '@/data/siteMetadata';

const ImageWithFallback = ({
  src,
  alt,
  width,
  height,
  ...rest
}: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <NextImage
      src={imgSrc}
      alt={alt}
      placeholder="blur"
      blurDataURL={`/_next/image?url=${imgSrc}&w=16&q=1`}
      onError={() => setImgSrc(siteMetaData.fallbackImage)}
      width={width || 1000}
      height={height || 1000}
      {...rest}
    />
  );
};

export default ImageWithFallback;
