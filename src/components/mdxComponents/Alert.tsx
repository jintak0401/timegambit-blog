import { ReactNode } from 'react';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from 'react-icons/fa';

interface Props {
  type: 'info' | 'success' | 'warning' | 'danger';
  children: string | ReactNode;
}

const typeMapping = {
  info: {
    icon: FaExclamationCircle,
    style:
      'border-[#4433ff] bg-[#dfebf6] dark:border-[#617bff] dark:bg-[#182635]',
    iconStyle: 'text-[#4433ff] dark:text-[#617bff]',
  },
  success: {
    icon: FaCheckCircle,
    style: 'border-[#00cc88] bg-[#00cc88]/10',
    iconStyle: 'text-[#00cc88]',
  },
  warning: {
    icon: FaExclamationTriangle,
    style:
      'border-[#ff9d00] bg-[#ffdd00]/25 dark:border-[#ff8000] dark:bg-[#ffa200]/10',
    iconStyle: 'text-[#ff9d00] dark:text-[#ff8000] !rounded-md',
  },
  danger: {
    icon: FaTimesCircle,
    style:
      'border-[#f90657] bg-[#d6054b]/10 dark:border-[#fa3879] dark:bg-[#d6054b]/10',
    iconStyle: 'text-[#f90657] dark:text-[#fa3879]',
  },
};

const Alert = ({ type, children }: Props) => {
  const { icon: Icon, style, iconStyle } = typeMapping[type];
  return (
    <div
      className={`${style} relative my-12 rounded-md border-l-2 px-5 py-3 transition-colors sm:border-l-4`}
    >
      <Icon
        className={`${iconStyle} duration-default absolute -left-0.5 top-0 h-8 w-8 -translate-y-1/2 -translate-x-1/2 overflow-visible rounded-full border border-white bg-white fill-current p-0.5 transition-colors dark:border-gray-900 dark:bg-gray-900 sm:h-10 sm:w-10`}
      />
      {children}
    </div>
  );
};

export default Alert;
