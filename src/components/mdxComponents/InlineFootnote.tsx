import { AnchorHTMLAttributes, DetailedHTMLProps, useState } from 'react';

import FootnoteTooltip from './FootnoteTooltip';

const InlineFootnote = ({
  href,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  const [_, setShow] = useState(false);

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
      <FootnoteTooltip idx={rest.children as string} />
    </span>
  );
};

export default InlineFootnote;
