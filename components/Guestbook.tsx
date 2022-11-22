import { signIn, signOut, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { SiGithub } from 'react-icons/si';

import phrases from '@/data/phrases';
import siteMetadata from '@/data/siteMetadata';

import Kakao from '@/components/social-icons/kakao.svg';
import Naver from '@/components/social-icons/naver.svg';

const iconMap = {
  naver: {
    icon: Naver,
    iconStyle: 'fill-current text-white !h-4',
    style: 'bg-[#2db400] text-white',
  },
  github: {
    icon: SiGithub,
    iconStyle: 'fill-current text-white bg-[#24292f] !h-7',
    style: 'bg-[#24292f] text-white',
  },
  google: {
    icon: FcGoogle,
    iconStyle: '!h-7',
    style: 'shadow-md text-black/[54%] font-semibold bg-white',
  },
  kakao: {
    icon: Kakao,
    iconStyle: 'fill-current text-black/90',
    style: 'bg-[#fee500] text-[#191919]',
  },
};

const Guestbook = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="space-y-3 rounded-md border-2 p-4">
        <h2 className="text-3xl font-semibold">
          {phrases.Guestbook.signInGuestbook}
        </h2>
        <div className="text-lg">{phrases.Guestbook.loginDescription}</div>
        <div className="grid grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-2 xl:grid-cols-4">
          {siteMetadata.oauth.providers.map((provider) => {
            const {
              icon: Icon,
              iconStyle,
              style,
            } = iconMap[provider as keyof typeof iconMap];
            return (
              <button
                key={provider}
                className={`${style} flex h-12 items-center justify-between rounded-xl px-5 py-2 text-xl`}
                onClick={() => signIn(provider)}
              >
                <Icon className={`${iconStyle} h-5 w-7`} />
                <span className="flex-1 text-center">
                  {phrases.Guestbook.login[provider as keyof typeof iconMap]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <button
        className="bg-red-200 px-5 py-2 text-xl"
        onClick={() => signOut()}
      >
        로그아웃
      </button>
    );
  }
};

export default Guestbook;
