/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    // domains: ["https://d3hlzyv4ta72d6.cloudfront.net/"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3hlzyv4ta72d6.cloudfront.net",
      }
    ]
  },
};

module.exports = nextConfig;
