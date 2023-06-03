import { useState } from 'react';
import NextImage, { ImageProps } from 'next/image';

import siteMetaData from 'data/site-metadata.mjs';

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
      onError={() => setImgSrc(siteMetaData.fallbackImage)}
      width={width || 1000}
      height={height || 1000}
      {...rest}
    />
  );
};

export default ImageWithFallback;
