import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import '@/css/tailwind.css';
import '@/css/prism.css';
import '@/css/katex.css';

import siteMetadata from '@/data/siteMetadata';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default MyApp;
