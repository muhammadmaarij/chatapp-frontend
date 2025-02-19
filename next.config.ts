/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
    ],
    domains: ["localhost"], // ✅ Allow images from localhost
  },
};

module.exports = nextConfig;
