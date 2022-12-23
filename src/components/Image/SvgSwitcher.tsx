import { ReactElement } from 'react';

interface Props {
  LightModeSvg: (props: {
    className?: string;
    svgkey?: string;
  }) => ReactElement;
  DarkModeSvg: (props: { className?: string; svgkey: string }) => ReactElement;
  svgkey?: string;
  className?: string;
}

const SvgSwitcher = ({
  LightModeSvg,
  DarkModeSvg,
  className,
  svgkey = '',
  ...rest
}: Props) => {
  return (
    <div className={`relative ${className}`} {...rest}>
      <LightModeSvg
        svgkey={svgkey ? `light_${svgkey}` : ''}
        className="absolute top-0 h-full w-full opacity-100 duration-500 dark:opacity-0"
      />
      <DarkModeSvg
        svgkey={svgkey ? `dark_${svgkey}` : ''}
        className="absolute top-0 h-full w-full opacity-0 duration-500 dark:opacity-100"
      />
    </div>
  );
};

export default SvgSwitcher;
