interface Props {
  onToggleNav: () => void;
}

const MobileNavButton = ({ onToggleNav }: Props) => {
  return (
    <button
      type="button"
      className="ml-1 mr-1 h-8 w-8 rounded sm:hidden"
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
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default MobileNavButton;
