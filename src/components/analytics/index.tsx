/* eslint-disable @typescript-eslint/no-explicit-any */
import siteMetadata from 'data/siteMetadata.mjs';

import { isProd } from '@/lib/isProduction';

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
