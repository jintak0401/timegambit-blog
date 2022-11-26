import NextImage, { ImageProps } from 'next/image';

const Image = ({ ...rest }: ImageProps) => {
  return (
    <div className="mb-4 -space-y-2 md:-space-y-1">
      <NextImage loading="lazy" {...rest} />
      <div className="middle-text text-center italic">{rest.alt}</div>
    </div>
  );
};

export default Image;
