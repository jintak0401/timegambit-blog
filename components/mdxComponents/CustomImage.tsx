import AutoImage from '@/components/Image/AutoImage';

interface Props {
  src?: string;
  alt?: string;
}

const CustomImage = ({ src, alt }: Props) => {
  return (
    <div className="mb-6 space-y-2 md:space-y-3">
      <AutoImage loading="lazy" src={src as string} alt={alt as string} />
      <div className="middle-text text-center italic">{alt}</div>
    </div>
  );
};

export default CustomImage;
