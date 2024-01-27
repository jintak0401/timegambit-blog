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
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          pathname: '**',
        },
        {
          protocol: 'http',
          hostname: 'k.kakaocdn.net',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'ssl.pstatic.net',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'phinf.pstatic.net',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'imgur.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
          pathname: '**',
        },
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
