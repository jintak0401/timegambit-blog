import { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import localFont from 'next/font/local';

import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';

import { ServerThemeProvider } from '@wits/next-themes';

import 'react-toastify/dist/ReactToastify.css';
import '@/css/tailwind.css';
import '@/css/prism.css';

import Analytics from '@/components/analytics';

import RootLayoutClient from './layout.client';

export const metadata: Metadata = {
  viewport: 'width=device-width, initial-scale=1',
  metadataBase: siteMetadata.siteUrl as unknown as URL,
  title: siteMetadata.title,
  description: phrases.Seo.homeDesc || siteMetadata.description,
  applicationName: siteMetadata.applicationName,
  themeColor: '#ffffff',
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
    title: siteMetadata.title,
    description: phrases.Seo.homeDesc || siteMetadata.description,
    images: siteMetadata.socialBanner,
    site: siteMetadata.twitter,
  },
  openGraph: {
    url: siteMetadata.siteUrl,
    type: 'website',
    title: siteMetadata.title,
    siteName: siteMetadata.title,
    description: phrases.Seo.homeDesc || siteMetadata.description,
    locale: siteMetadata.locale,
    images: siteMetadata.socialBanner,
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

const RootLayout = async ({ children }: PropsWithChildren) => {
  return (
    <ServerThemeProvider>
      <html lang={siteMetadata.language} className="scroll-smooth">
        <body className="antialiased">
          <Analytics />
          <RootLayoutClient className={`${dejavu.variable} font-sans`}>
            {children}
          </RootLayoutClient>
          <div id="modal" />
        </body>
      </html>
    </ServerThemeProvider>
  );
};

export default RootLayout;
