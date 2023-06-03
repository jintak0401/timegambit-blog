'use client';

import {
  AnchorHTMLAttributes,
  forwardRef,
  MouseEvent,
  ReactNode,
  RefAttributes,
} from 'react';
import NextLink, { LinkProps } from 'next/link';

import { scrollPosStore } from '@/lib/scroll-pos-store';

const isModifiedEvent = (event: MouseEvent): boolean => {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
  const target = eventTarget.getAttribute('target');
  return (
    target !== '_self' ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.nativeEvent.button == 2
  );
};

const { onStartRouteCb } = scrollPosStore;
const NavLink = forwardRef<
  HTMLAnchorElement,
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    Omit<LinkProps, 'href'> & {
      href: string;
      children?: ReactNode;
    } & RefAttributes<HTMLAnchorElement>
>(function Link({ href, onClick, ...rest }, ref) {
  return (
    <NextLink
      href={href}
      onClick={(event) => {
        if (!isModifiedEvent(event)) {
          const { pathname, search, hash } = window.location;
          const curPath = pathname + search + hash;
          if (href !== curPath) onStartRouteCb(curPath, href);
        }
        if (onClick) onClick(event);
      }}
      {...rest}
      ref={ref}
    />
  );
});

export default NavLink;
