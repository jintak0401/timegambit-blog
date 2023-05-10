/* eslint-disable jsx-a11y/anchor-has-content */
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import NextLink from 'next/link';

import InlineFootnote from './inline-footnote';

const CustomLink = ({
  href,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    return (
      <NextLink legacyBehavior href={href}>
        <a {...rest} />
      </NextLink>
    );
  }

  if (isAnchorLink) {
    if (rest['aria-describedby'] === 'footnote-label') {
      return <InlineFootnote href={href} {...rest} />;
    }
    return <a href={href} {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};

export default CustomLink;
