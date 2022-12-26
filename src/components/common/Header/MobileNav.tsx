import navLinks from 'data/navLinks';
import Link from 'next/link';

interface Props {
  navShow: boolean;
  onToggleNav: () => void;
}

const MobileNav = ({ navShow, onToggleNav }: Props) => {
  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen w-screen transform bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-gray-800 sm:hidden ${
        navShow ? 'translate-x-0' : 'translate-x-full'
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
          <div key={link.title} className="px-12 py-4">
            <Link
              href={link.href}
              className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
              onClick={onToggleNav}
            >
              {link.title}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default MobileNav;
