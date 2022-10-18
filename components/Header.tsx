import Link from 'next/link';
import { useRouter } from 'next/router';

import { useScrollDirection } from '@/hooks/useScrollDirection';

import Logo from '@/data/logo.svg';
import navLinks from '@/data/navLinks';
import siteMetadata from '@/data/siteMetadata';

import MobileNav from '@/components/MobileNav';
import ThemeSwitch from '@/components/ThemeSwitch';

const BOUND_INDEX = 2;

export default function Header() {
  const scrollDirection = useScrollDirection();
  const path = useRouter().pathname.split('/')[1];
  const isSamePath = (title: string) => path === title.toLowerCase();

  const navItems = (
    <nav>
      <ul className="flex">
        {navLinks.map(({ href, title }, idx) => (
          <li
            key={idx}
            className={`transition-all hover:scale-110 ${
              idx > BOUND_INDEX ? 'hidden lg:inline-block' : ''
            }`}
          >
            <Link href={href}>
              <a
                className={`mx-1 rounded p-1 font-semibold text-gray-900 transition-all duration-500 dark:text-gray-100 sm:px-4 sm:py-2 ${
                  isSamePath(title)
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-800 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                {title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <header
      className={`w-section fixed left-0 right-0 z-10 flex items-center justify-between border-b-2 bg-white py-2 transition-all duration-500 dark:bg-gray-900 ${
        scrollDirection === 'down' ? '-top-24' : 'top-0'
      }`}
    >
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex cursor-pointer items-center justify-between">
            <div className="mr-3">
              <Logo className="h-7 w-7 fill-current text-primary-500 dark:text-primary-300" />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">{navItems}</div>
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
}
