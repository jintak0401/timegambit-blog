import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

import siteMetaData from '@/data/siteMetadata';

const ImageWithFallback = ({ src, alt, ...rest }: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      placeholder="blur"
      blurDataURL={`/_next/image?url=${imgSrc}&w=16&q=1`}
      onError={() => setImgSrc(siteMetaData.fallbackImage)}
      {...rest}
    />
  );
};

export default ImageWithFallback;
