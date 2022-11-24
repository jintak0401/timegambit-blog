import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children }: PropsWithChildren) => {
  const ref = useRef<Element | null>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#modal');
    setOpened(true);
  }, []);
  return opened && ref.current
    ? createPortal(
        <div className="fixed left-0 top-0 z-30 block flex h-full w-full items-center justify-center overflow-auto bg-black/60 pt-5">
          <div className="h-fit w-fit bg-white">{children}</div>
        </div>,
        ref.current
      )
    : null;
};

export default Modal;
