import { ImageProps } from 'next/image';

import AutoImage from '@/components/AutoImage';

const Image = ({ src, alt, ...rest }: ImageProps) => {
  return (
    <div className="mb-6 space-y-2 md:space-y-3">
      <AutoImage loading="lazy" src={src} alt={alt} {...rest} />
      <div className="middle-text text-center italic">{alt}</div>
    </div>
  );
};

export default Image;
