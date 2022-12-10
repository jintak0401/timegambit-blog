import NextImage from 'next/image';
import { ImageProps } from 'next/image';
import { useRef, useState } from 'react';

interface Props extends ImageProps {
  rate?: number;
  backgroundOpacity?: number;
  duration?: number;
}

const Zoom = (props: Props) => {
  const {
    className,
    rate = 90,
    backgroundOpacity = 0.9,
    duration = 300,
    ...imageProps
  } = props;

  const imageRef = useRef<HTMLImageElement>(null);

  const [clicked, setClicked] = useState(false);
  const [zIndex, setZIndex] = useState<number>(0);

  const handleImageZoom = () => {
    if (!imageRef.current || clicked) return;

    const imageRect = imageRef.current.getBoundingClientRect();
    const clientHeight = imageRect.height;
    const clientWidth = imageRect.width;

    const wPrim = (window.innerWidth - imageRect.width) / 2;
    const hPrim = (window.innerHeight - imageRect.height) / 2;
    const cL = imageRect.left;
    const cT = imageRect.top;

    const zoomPerc = rate / 100;
    if (
      ((window.innerHeight * zoomPerc) / clientHeight) * clientWidth >=
      window.innerWidth
    ) {
      imageRef.current.style.transform = `translate(${wPrim - cL}px,${
        hPrim - cT
      }px) scale(${(window.innerWidth * zoomPerc) / clientWidth})`;
    } else {
      imageRef.current.style.transform = `translate(${wPrim - cL}px,${
        hPrim - cT
      }px) scale(${(window.innerHeight * zoomPerc) / clientHeight})`;
    }

    window.document.addEventListener('scroll', closeWrapper, { once: true });

    setClicked(true);
  };

  const closeWrapper = () => {
    if (!imageRef.current) return;

    imageRef.current.style.transform = `scale(1)`;

    setZIndex(10);
    setTimeout(() => setZIndex(0), duration + 100);
    setClicked(false);
  };

  return (
    <>
      {clicked && (
        <div
          className="fixed top-0 left-0 z-30 h-full w-full cursor-zoom-out bg-black opacity-90"
          onClick={closeWrapper}
        />
      )}
      <NextImage
        className={`relative my-0 block overflow-hidden duration-${duration} ${
          clicked ? 'z-50' : `${zIndex === 10 ? 'z-10' : 'z-0'} cursor-zoom-in`
        } ${className || ''}`}
        ref={imageRef}
        onClick={handleImageZoom}
        {...imageProps}
      />
    </>
  );
};

export default Zoom;
