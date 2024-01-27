import { ReactNode, Suspense } from 'react';
import { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import phrases from 'data/phrases';
import siteMetadata from 'data/site-metadata.mjs';

import { ServerThemeProvider } from '@wits/next-themes';

import 'react-toastify/dist/ReactToastify.css';
import '@/css/tailwind.css';
import '@/css/prism.css';

import { defaultOpenGraph, defaultTwitter } from '@/lib/metadata';

import Analytics from '@/components/analytics';

import RootLayoutClient from './layout.client';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export const metadata: Metadata = {
  metadataBase: siteMetadata.siteUrl as unknown as URL,
  title: {
    absolute: siteMetadata.title,
    template: siteMetadata.titleTemplate,
  },
  description: phrases.Seo.homeDesc || siteMetadata.description,
  applicationName: siteMetadata.applicationName,
  alternates: {
    canonical: siteMetadata.siteUrl,
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  creator: siteMetadata.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    ...defaultTwitter,
  },
  openGraph: {
    ...defaultOpenGraph,
  },
  icons: {
    icon: [
      {
        url: '/static/favicons/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
      {
        url: '/static/favicons/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        url: '/static/favicons/favicon-16x16.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    apple: {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/static/favicons/apple-touch-icon.png',
      type: 'image/png',
    },
  },
  manifest: '/static/favicons/manifest.json',
};

const dejavu = localFont({
  src: '../fonts/dejavu-400.woff2',
  variable: '--font-dejavu',
  display: 'swap',
  fallback: ['Pretendard'],
});

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <ServerThemeProvider
      attribute="class"
      defaultTheme={siteMetadata.theme}
      enableColorScheme={false}
    >
      <html lang={siteMetadata.language} className="scroll-smooth">
        <body className="overflow-x-hidden antialiased">
          <Analytics />
          <Suspense>
            <RootLayoutClient className={`${dejavu.variable} font-sans`}>
              {children}
            </RootLayoutClient>
          </Suspense>
          <div id="modal" />
        </body>
      </html>
    </ServerThemeProvider>
  );
};

export default RootLayout;
