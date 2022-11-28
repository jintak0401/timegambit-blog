const { withContentlayer } = require('next-contentlayer');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withContentlayer(
  withBundleAnalyzer({
    reactStrictMode: true,
    swcMinify: true,

    images: {
      domains: [
        'lh3.googleusercontent.com',
        'k.kakaocdn.net',
        'avatars.githubusercontent.com',
        'ssl.pstatic.net',
        'phinf.pstatic.net',
      ],
    },

    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
      dirs: ['pages', 'components', 'lib', 'layouts'],
    },

    webpack: (config, { dev, isServer }) => {
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
