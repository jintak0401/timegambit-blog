import { CSSProperties, useEffect, useRef } from 'react';

import useGetFootnoteBody from '@/hooks/use-get-footnote-body';

interface Props {
  idx: string;
  show: boolean;
}

const Y_OFFSET = 30;
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

    const { left, top } = ref.current.parentElement.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };

    // x-axix
    const viewWidth = window.innerWidth;
    const width = ref.current.offsetWidth;
    let translateX = -width / 2;
    if (left - width / 2 < 0) {
      translateX += width / 2 - left + X_OFFSET;
    } else if (left + width / 2 > viewWidth) {
      translateX -= left + width / 2 - viewWidth + X_OFFSET;
    }

    // y-axis
    const height = ref.current.offsetHeight;
    let translateY = -height;
    if (top - height - Y_OFFSET < 0) {
      translateY += height + Y_OFFSET;
    }

    ret.transform = `translate(${translateX}px, ${translateY}px)`;

    return ret;
  };

  return body ? (
    <span
      aria-label="footnote tooltip"
      ref={ref}
      className="invisible absolute left-0 z-30 w-max whitespace-nowrap rounded-md border border-gray-700 bg-white px-5 drop-shadow dark:border-gray-300 dark:border-gray-700 dark:bg-gray-900 sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-7xl"
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
