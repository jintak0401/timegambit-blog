import { AnchorHTMLAttributes, DetailedHTMLProps, useState } from 'react';

import FootnoteTooltip from './FootnoteTooltip';

const InlineFootnote = ({
  href,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  const [show, setShow] = useState(false);

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
};

export default InlineFootnote;
