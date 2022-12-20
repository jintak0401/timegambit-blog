import { ReactElement } from 'react';

interface Props {
  LightModeSvg: (props: { className?: string }) => ReactElement;
  DarkModeSvg: (props: { className?: string }) => ReactElement;
  className?: string;
}

const SvgSwitcher = ({
  LightModeSvg,
  DarkModeSvg,
  className,
  ...rest
}: Props) => {
  return (
    <div className={`relative ${className}`} {...rest}>
      <LightModeSvg className="absolute h-full w-full opacity-100 duration-500 dark:opacity-0" />
      <DarkModeSvg className="absolute h-full w-full opacity-0 duration-500 dark:opacity-100" />
    </div>
  );
};

export default SvgSwitcher;
