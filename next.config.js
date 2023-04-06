const { withContentlayer } = require('next-contentlayer');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const REDIRECT = {
  '/blog/blog-log/dynamic-import-og-error':
    '/blog/solve/dynamic-import-og-error',
  '/blog/blog-log/contribute-next-auth': '/blog/solve/contribute-next-auth',
  '/blog/blog-log/svg-usage-fix-bug': '/blog/solve/svg-usage-fix-bug',
};

/** @type {import('next').NextConfig} */
const nextConfig = withContentlayer(
  withBundleAnalyzer({
    reactStrictMode: true,
    swcMinify: true,

    async redirects() {
      return Object.entries(REDIRECT).map(([source, destination]) => ({
        source,
        destination,
        permanent: false,
      }));
    },

    images: {
      domains: [
        'lh3.googleusercontent.com',
        'k.kakaocdn.net',
        'avatars.githubusercontent.com',
        'ssl.pstatic.net',
        'phinf.pstatic.net',
        'imgur.com',
        'i.imgur.com',
      ],
    },

    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
      dirs: ['pages', 'components', 'lib', 'layouts'],
    },

    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              icon: true,
            },
          },
        ],
      });

      return config;
    },
  })
);

module.exports = nextConfig;
