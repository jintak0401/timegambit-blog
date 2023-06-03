import { DarkLogo, DarkLogoTitle, Logo, LogoTitle } from 'data/logo';
import phrases from 'data/phrases';

import SvgSwitcher from '@/components/image/svg-switcher';

const Introduction = () => {
  return (
    <div className="mb-14 mt-5 flex w-full flex-col items-center justify-around lg:flex-row-reverse">
      <div className="flex flex-1 items-center justify-center">
        <SvgSwitcher
          className="h-32 w-32"
          svgkey="introduction_logo"
          LightModeSvg={Logo}
          DarkModeSvg={DarkLogo}
        />
      </div>
      <div className="flex-2">
        <SvgSwitcher
          className="mx-auto mt-5 h-10 w-72 fill-current lg:mx-0 lg:mt-0 lg:w-96"
          svgkey="introduction_title"
          LightModeSvg={LogoTitle}
          DarkModeSvg={DarkLogoTitle}
        />
        <div className="my-3 text-center font-medium text-gray-600 dark:text-gray-300 sm:text-lg lg:text-start">
          {phrases.Main.description}
        </div>
        {phrases.Main.subDescription && (
          <div className="weak-text text-center font-medium leading-none sm:text-lg lg:text-start">
            {phrases.Main.subDescription}
          </div>
        )}
      </div>
    </div>
  );
};

export default Introduction;
