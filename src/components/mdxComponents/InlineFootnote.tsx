import { AnchorHTMLAttributes, DetailedHTMLProps, useState } from 'react';

import { isTouchDevice } from '@/lib/utils';
import useIsClient from '@/hooks/useIsClient';

import FootnoteModal from '@/components/mdxComponents/FootnoteModal';

import FootnoteTooltip from './FootnoteTooltip';

const InlineFootnote = ({
  href,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  const [show, setShow] = useState(false);
  const isClient = useIsClient();

  if (isTouchDevice() && isClient) {
    return (
      <>
        <span
          {...rest}
          className="py-2 text-primary-500 before:content-['['] after:content-[']'] dark:text-primary-400"
          onClick={() => setShow(true)}
        />
        {show && (
          <FootnoteModal
            idx={rest.children as string}
            onClose={() => setShow(false)}
          />
        )}
      </>
    );
  } else {
    return (
      <span
        className="group"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <a
          href={href}
          {...rest}
          className="py-2 before:content-['['] after:content-[']']"
        />
        <FootnoteTooltip idx={rest.children as string} show={show} />
      </span>
    );
  }
};

export default InlineFootnote;
