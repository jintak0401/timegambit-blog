/* eslint-disable @typescript-eslint/no-explicit-any */
import siteMetadata from 'data/siteMetadata.mjs';

import { isProd } from '@/lib/is-production';

import GA from './google-analytics';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const Analytics = () => {
  return <>{isProd && siteMetadata.analytics.googleAnalyticsId && <GA />}</>;
};

export default Analytics;
