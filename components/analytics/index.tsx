/* eslint-disable @typescript-eslint/no-explicit-any */
import { isProd } from '@/lib/isProduction';

import siteMetadata from '@/data/siteMetadata';

import GA from './GoogleAnalytics';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const Analytics = () => {
  return <>{isProd && siteMetadata.analytics.googleAnalyticsId && <GA />}</>;
};

export default Analytics;
