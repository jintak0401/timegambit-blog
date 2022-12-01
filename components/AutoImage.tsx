import { ImageProps } from 'next/image';

import ImageWithFallback from '@/components/ImageWithFallback';

interface Props extends ImageProps {
  className?: string;
}

const AutoImage = ({ src, alt, className, ...rest }: Props) => {
  return (
    <div className="auto-image-wrapper">
      <ImageWithFallback
        src={src}
        alt={alt}
        className={`${className} !relative !h-auto`}
        layout="fill"
        {...rest}
      />
    </div>
  );
};

export default AutoImage;
