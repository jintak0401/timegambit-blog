import { CSSProperties, useEffect, useRef } from 'react';

import useGetFootnoteBody from '@/hooks/useGetFootnoteBody';

interface Props {
  idx: string;
  show: boolean;
}

const OFFSET_BOUNDARY = 200;
const Y_OFFSET = 20;
const X_OFFSET = 20;

const FootnoteTooltip = ({ idx, show }: Props) => {
  const body = useGetFootnoteBody(idx);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.visibility = show ? 'visible' : 'hidden';
  }, [show]);

  const getStyle = () => {
    if (!ref.current?.parentElement) {
      return { transform: 'translateX(-50%)', top: Y_OFFSET };
    }
    const ret: CSSProperties = {};
    const viewWidth = window.innerWidth;
    const width = ref.current.offsetWidth;
    const { left, top } = ref.current.parentElement.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };
    let translateX = -width / 2;
    if (left - width / 2 < 0) {
      translateX += width / 2 - left + X_OFFSET;
    } else if (left + width / 2 > viewWidth) {
      translateX -= left + width / 2 - viewWidth + X_OFFSET;
    }
    ret.transform = `translateX(${translateX}px)`;
    ret[top > OFFSET_BOUNDARY ? 'bottom' : 'top'] = Y_OFFSET;

    return ret;
  };

  return body ? (
    <span
      aria-label="footnote tooltip"
      ref={ref}
      className="invisible absolute left-0 z-30 w-max whitespace-nowrap rounded-md border border-gray-700 bg-white px-5 drop-shadow dark:border-gray-700 dark:border-gray-300 dark:bg-gray-900 sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-7xl"
      style={getStyle() as CSSProperties}
    >
      <span
        className="footnote-tooltip inline-block whitespace-normal text-base"
        dangerouslySetInnerHTML={{ __html: body as string }}
      />
    </span>
  ) : null;
};

export default FootnoteTooltip;
