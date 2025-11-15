import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      {
        ...(fileLoaderRule as object),
        test: /\.svg$/i,
        resourceQuery: /url/,
      },

      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: /url/ },
        use: ['@svgr/webpack'],
      }
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;
