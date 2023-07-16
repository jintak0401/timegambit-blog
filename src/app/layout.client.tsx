'use client';

import { ReactNode } from 'react';

import siteMetadata from 'data/site-metadata.mjs';

import { ThemeProvider } from '@wits/next-themes';
import { ToastContainer } from 'react-toastify';

import { useMoveTopAtBlogPost } from '@/hooks/use-move-top-at-blog-post';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';

interface Props {
  children: ReactNode;
  className: string;
}

const BodyLayout = ({ children, className }: Props) => {
  return (
    <>
      <div className="fixed left-0 top-0 -z-10 h-screen w-screen bg-white transition-colors duration-300 dark:bg-gray-900" />
      <div className="w-section flex min-h-screen flex-col justify-between">
        <Header />
        <main className={`mb-auto mt-24 ${className}`}>{children}</main>
        <hr />
        <Footer />
      </div>
    </>
  );
};

const RootLayoutClient = ({ children, className }: Props) => {
  useMoveTopAtBlogPost();

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
