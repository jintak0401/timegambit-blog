'use client';

import { ComponentProps, forwardRef, MouseEvent } from 'react';
import NextLink from 'next/link';

import { scrollPosStore } from '@/lib/scrollPosStore';

const isModifiedEvent = (event: MouseEvent): boolean => {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
  const target = eventTarget.getAttribute('target');
  return (
    (target && target !== '_self') ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    (event.nativeEvent && event.nativeEvent.which === 2)
  );
};

const { onStartCb } = scrollPosStore;
const NavLink = forwardRef<HTMLAnchorElement, ComponentProps<'a'>>(
  function Link({ href, onClick, ...rest }, ref) {
    const useLink = href && href.startsWith('/');
    if (!useLink) return <a href={href} onClick={onClick} {...rest} />;

    return (
      <NextLink
        href={href}
        onClick={(event) => {
          if (!isModifiedEvent(event)) {
            const { pathname, search, hash } = window.location;
            const curPath = pathname + search + hash;
            if (href !== pathname + search + hash) onStartCb(curPath, href);
          }
          if (onClick) onClick(event);
        }}
        {...rest}
        ref={ref}
      />
    );
  }
);

export default NavLink;
