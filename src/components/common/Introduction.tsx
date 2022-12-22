import DarkLogo from 'data/logo/darkLogo.svg';
import DarkLogoTitle from 'data/logo/darkLogoTitle.svg';
import Logo from 'data/logo/LogoComponent';
import LogoTitle from 'data/logo/logoTitle.svg';
import phrases from 'data/phrases';

import SvgSwitcher from '@/components/Image/SvgSwitcher';

const Introduction = () => {
  return (
    <div className="mt-5 mb-14 flex w-full flex-col items-center justify-around fill-current text-primary-500 dark:text-primary-300 lg:flex-row-reverse">
      <div className="flex flex-1 items-center justify-center">
        <SvgSwitcher
          className="h-32 w-32"
          svgkey="introduction"
          LightModeSvg={Logo}
          DarkModeSvg={DarkLogo}
        />
      </div>
      <div className="flex-1">
        <SvgSwitcher
          className="mx-auto mt-5 h-10 w-72 fill-current lg:mx-0 lg:mt-0 lg:w-96"
          LightModeSvg={LogoTitle}
          DarkModeSvg={DarkLogoTitle}
        />
        <p className="my-3 font-medium text-gray-600 duration-500 dark:text-gray-300">
          {phrases.Main.description}
        </p>
        {phrases.Main.subDescription && (
          <p className="font-medium leading-none text-gray-400 duration-500 dark:text-gray-500">
            {phrases.Main.subDescription}
          </p>
        )}
      </div>
    </div>
  );
};

export default Introduction;
