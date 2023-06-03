import { usePathname } from 'next/navigation';

import navLinks from 'data/nav-links';

import NavLink from '@/components/common/nav-link';

interface Props {
  navShow: boolean;
  onToggleNav: () => void;
}

const isCurPath = (path: string, title: string) =>
  path.includes(title.toLowerCase());

const MobileNav = ({ navShow, onToggleNav }: Props) => {
  const pathname = usePathname();

  return (
    <div
      className={`fixed left-full top-0 z-40 h-screen w-screen bg-gray-200 opacity-95 duration-300 dark:bg-gray-800 sm:hidden ${
        navShow ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      <div className="flex justify-end">
        <button
          type="button"
          className="mr-5 mt-11 h-8 w-8 rounded"
          aria-label="Toggle Menu"
          onClick={onToggleNav}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="text-gray-900 dark:text-gray-100"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <nav className="fixed mt-8 h-full">
        {navLinks.map((link) => (
          <NavLink
            key={link.title}
            href={link.href}
            className={`mx-12 my-8 block w-fit text-2xl font-bold tracking-widest text-gray-900 decoration-primary-600 decoration-4 underline-offset-8 dark:text-gray-100 dark:decoration-primary-400 ${
              isCurPath(pathname, link.title) ? 'underline' : ''
            }`}
            onClick={onToggleNav}
          >
            {link.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MobileNav;
