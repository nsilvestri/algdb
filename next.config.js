/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["algdb.vercel.app", "localhost"]
    }
  }
};

module.exports = nextConfig;
