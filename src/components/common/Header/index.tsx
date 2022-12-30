import { DarkLogo, DarkLogoTitle, Logo, LogoTitle } from 'data/logo';
import navLinks from 'data/navLinks';
import siteMetadata from 'data/siteMetadata.mjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useScrollDirection } from '@/hooks/useScrollDirection';

import SvgSwitcher from '@/components/Image/SvgSwitcher';

import MobileNav from './MobileNav';
import MobileNavButton from './MobileNavButton';
import ThemeSwitch from './ThemeSwitch';

const BOUND_INDEX = 3;

const NavItems = () => {
  const path = useRouter().pathname.split('/')[1];
  const isSamePath = (title: string) => path === title.toLowerCase();

  return (
    <nav className="hidden sm:block">
      <ul className="flex">
        {navLinks.map(({ href, title }, idx) => (
          <li
            key={idx}
            className={`transition-all hover:scale-110 ${
              idx > BOUND_INDEX ? 'hidden xl:inline-block' : ''
            }`}
          >
            <Link
              href={href}
              className={`duration-default mx-1 rounded p-1 font-semibold sm:px-4 sm:py-2 ${
                isSamePath(title)
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-800 dark:text-primary-200'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default function Header() {
  const scrollDirection = useScrollDirection();
  const [navShow, setNavShow] = useState(false);

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto';
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
      }
      return !status;
    });
  };

  return (
    <>
      <header
        className={`w-section transition-header fixed left-0 right-0 z-20 flex items-center justify-between border-b-2 bg-white py-2 dark:bg-gray-900 ${
          scrollDirection === 'down'
            ? '-translate-y-[70px] sm:-translate-y-16'
            : 'translate-y-0'
        }`}
      >
        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="flex cursor-pointer items-center justify-between"
        >
          <SvgSwitcher
            className="mr-3 h-8 w-8"
            svgkey="header_logo"
            LightModeSvg={Logo}
            DarkModeSvg={DarkLogo}
          />
          <div className="hidden md:block">
            <SvgSwitcher
              className="h-6 w-52"
              svgkey="header_title"
              LightModeSvg={LogoTitle}
              DarkModeSvg={DarkLogoTitle}
            />
          </div>
        </Link>
        <div className="flex items-center py-1 text-base leading-5 sm:py-0">
          <NavItems />
          <ThemeSwitch />
          <MobileNavButton onToggleNav={onToggleNav} />
        </div>
      </header>
      <MobileNav onToggleNav={onToggleNav} navShow={navShow} />
    </>
  );
}
