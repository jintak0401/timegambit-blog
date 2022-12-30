import NextImage from 'next/image';
import { ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!error) return;
    throw 'Image not loaded';
  }, [error]);

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
    imageRef.current.style.zIndex = '50';
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

    imageRef.current.style.zIndex = '10';
    setTimeout(
      () => imageRef.current && (imageRef.current.style.zIndex = ''),
      duration + 100
    );
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
        className={`relative my-0 block overflow-hidden duration-300 ${
          clicked ? '' : 'cursor-zoom-in'
        } ${className || ''}`}
        ref={imageRef}
        onClick={handleImageZoom}
        onError={() => setError(true)}
        {...imageProps}
      />
    </>
  );
};

export default Zoom;
