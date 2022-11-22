import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import '@fontsource/dejavu-mono';

import '@/css/tailwind.css';
import '@/css/prism.css';
import '@/css/katex.css';

import siteMetadata from '@/data/siteMetadata';

import Analytics from '@/components/analytics';
import LayoutWrapper from '@/components/LayoutWrapper';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <LayoutWrapper>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </LayoutWrapper>
    </ThemeProvider>
  );
}
