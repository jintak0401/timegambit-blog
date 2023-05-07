'use client';

import { PropsWithChildren } from 'react';

import siteMetadata from 'data/siteMetadata.mjs';

import { ThemeProvider } from '@wits/next-themes';
import { ToastContainer } from 'react-toastify';

import clsx from '@/lib/clsx';
import { useRestoreScroll } from '@/hooks/use-restore-scroll';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

interface Props extends PropsWithChildren {
  className?: string;
}

const BodyLayout = ({ children, className }: Props) => {
  return (
    <>
      <div className="fixed left-0 top-0 -z-10 h-screen w-screen bg-white transition-colors duration-300 dark:bg-gray-900" />
      <div className="w-section">
        <div className="flex h-screen flex-col justify-between">
          <Header />
          <main className={clsx('mb-auto mt-24', className)}>{children}</main>
          <hr />
          <Footer />
        </div>
      </div>
    </>
  );
};

const RootLayoutClient = ({ children, className }: Props) => {
  useRestoreScroll();

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme={siteMetadata.theme}
        enableColorScheme={false}
      >
        <BodyLayout className={className}>{children}</BodyLayout>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};

export default RootLayoutClient;
