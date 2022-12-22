import LogoTitle from 'data/logo/_logoTitle.svg';
import DarkLogo from 'data/logo/darkLogo.svg';
import DarkLogoTitle from 'data/logo/darkLogoTitle.svg';
import Logo from 'data/logo/LogoComponent';
import navLinks from 'data/navLinks';
import siteMetadata from 'data/siteMetadata.mjs';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useScrollDirection } from '@/hooks/useScrollDirection';

import SvgSwitcher from '@/components/Image/SvgSwitcher';

import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';

const BOUND_INDEX = 3;

export default function Header() {
  const scrollDirection = useScrollDirection();
  const path = useRouter().pathname.split('/')[1];
  const isSamePath = (title: string) => path === title.toLowerCase();

  const navItems = (
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
              className={`mx-1 rounded p-1 font-semibold transition-all duration-500 sm:px-4 sm:py-2 ${
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

  return (
    <header
      className={`w-section fixed left-0 right-0 z-30 flex items-center justify-between border-b-2 bg-white py-2 transition-all duration-500 dark:bg-gray-900 ${
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
          LightModeSvg={Logo}
          DarkModeSvg={DarkLogo}
        />
        <div className="hidden md:block">
          <SvgSwitcher
            className="h-6 w-52"
            LightModeSvg={LogoTitle}
            DarkModeSvg={DarkLogoTitle}
          />
        </div>
      </Link>
      <div className="flex items-center text-base leading-5">
        {navItems}
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
}
