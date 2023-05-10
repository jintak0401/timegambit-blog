'use client';

import { useEffect, useRef, useState } from 'react';
import NextImage, { ImageProps } from 'next/image';

const DURATION = 300;
const TIMEOUT_DELAY = 100;
const BACKGROUND_OPACITY = 0.9;
const ZOOM_RATE = 0.9;

const Zoom = (props: ImageProps) => {
  const { className, ...imageProps } = props;

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

    imageRef.current.style.zIndex = '50';
    if (
      ((window.innerHeight * ZOOM_RATE) / clientHeight) * clientWidth >=
      window.innerWidth
    ) {
      imageRef.current.style.transform = `translate(${wPrim - cL}px,${
        hPrim - cT
      }px) scale(${(window.innerWidth * ZOOM_RATE) / clientWidth})`;
    } else {
      imageRef.current.style.transform = `translate(${wPrim - cL}px,${
        hPrim - cT
      }px) scale(${(window.innerHeight * ZOOM_RATE) / clientHeight})`;
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
      DURATION + TIMEOUT_DELAY
    );
    setClicked(false);
  };

  return (
    <>
      {clicked && (
        <div
          className="fixed left-0 top-0 z-30 h-full w-full cursor-zoom-out bg-white dark:bg-black"
          style={{ opacity: BACKGROUND_OPACITY }}
          onClick={closeWrapper}
        />
      )}
      <NextImage
        className={`relative my-0 block overflow-hidden ${
          clicked ? '' : 'cursor-zoom-in'
        } ${className || ''}`}
        style={{ transition: `transform ${DURATION}ms` }}
        ref={imageRef}
        onClick={handleImageZoom}
        onError={() => setError(true)}
        {...imageProps}
      />
    </>
  );
};

export default Zoom;
