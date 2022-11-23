import Image from 'next/image';

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

const AutoImage = ({ src, alt, className }: Props) => {
  return (
    <div className="auto-image-wrapper">
      <Image
        alt={alt || ''}
        src={src}
        className={`${className} !relative !h-auto !object-contain`}
        blurDataURL={`/_next/image?url=${src}&w=16&q=1`}
        layout="fill"
        loading="lazy"
      />
    </div>
  );
};

export default AutoImage;
