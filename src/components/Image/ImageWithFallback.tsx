import siteMetaData from 'data/siteMetadata.mjs';
import NextImage, { ImageProps } from 'next/image';
import { useState } from 'react';

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
