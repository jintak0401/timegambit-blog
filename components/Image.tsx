import { ImageProps } from 'next/image';

import AutoImage from '@/components/AutoImage';

const Image = ({ ...rest }: ImageProps) => {
  return (
    <div className="mb-6 space-y-2 md:space-y-3">
      <AutoImage loading="lazy" {...rest} />
      <div className="middle-text text-center italic">{rest.alt}</div>
    </div>
  );
};

export default Image;
