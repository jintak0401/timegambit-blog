import NextImage, { ImageProps } from 'next/image';

const Image = ({ ...rest }: ImageProps) => (
  <NextImage loading="lazy" {...rest} />
);

export default Image;
