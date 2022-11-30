import AutoImage from '@/components/AutoImage';

interface Props {
  src?: string;
  alt?: string;
}

const Image = ({ src, alt }: Props) => {
  src = src || 'https://i.imgur.com/EJwWeUH.png';
  alt = alt || '이미지를 불러올 수 없습니다';
  return (
    <div className="mb-6 space-y-2 md:space-y-3">
      <AutoImage loading="lazy" src={src} alt={alt} />
      <div className="middle-text text-center italic">{alt}</div>
    </div>
  );
};

export default Image;
