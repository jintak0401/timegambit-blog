import Image, { ImageProps } from 'next/image';

interface Props extends ImageProps {
  className?: string;
}

const AutoImage = ({ src, alt, className, ...rest }: Props) => {
  return (
    <div className="auto-image-wrapper">
      <Image
        alt={alt || ''}
        src={src}
        className={`${className} !relative !h-auto`}
        blurDataURL={`/_next/image?url=${src}&w=16&q=1`}
        layout="fill"
        {...rest}
      />
    </div>
  );
};

export default AutoImage;
