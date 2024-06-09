/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3hlzyv4ta72d6.cloudfront.net",
      },
    ]
  },
};

module.exports = nextConfig;
