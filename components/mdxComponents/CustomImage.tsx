import React from 'react';

import Zoom from '@/components/Image/Zoom';

interface Props {
  src?: string;
  alt?: string;
}

const CustomImage = ({ src, alt }: Props) => {
  return (
    <div className="mb-6 space-y-2 md:space-y-3">
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
      <div className="middle-text text-center italic">{alt}</div>
    </div>
  );
};

export default CustomImage;
