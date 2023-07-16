const { withContentlayer } = require('next-contentlayer');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withContentlayer(
  withBundleAnalyzer({
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      serverComponentsExternalPackages: ['mysql2'],
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
