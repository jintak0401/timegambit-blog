export const IMAGE_LOAD = 'image-load';

export const onCompleteImageLoad = () => {
  const event = new CustomEvent(IMAGE_LOAD);
  dispatchEvent(event);
};
