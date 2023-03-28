import localFont from '@next/font/local';
import siteMetadata from 'data/siteMetadata.mjs';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@/css/tailwind.css';
import '@/css/prism.css';

import useRestoreScrollPos from '@/hooks/useRestoreScrollPos';

import Analytics from '@/components/analytics';
import LayoutWrapper from '@/components/common/LayoutWrapper';

const dejavu = localFont({
  src: '../fonts/dejavu-400.woff2',
  variable: '--font-dejavu',
  display: 'swap',
  fallback: ['Pretendard'],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  useRestoreScrollPos();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={siteMetadata.theme}
      enableColorScheme={false}
    >
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <LayoutWrapper className={`${dejavu.variable} font-sans`}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </LayoutWrapper>
      <ToastContainer />
    </ThemeProvider>
  );
}
