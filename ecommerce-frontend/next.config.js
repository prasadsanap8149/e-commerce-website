/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
    NEXT_PUBLIC_AUTH: process.env.NEXT_PUBLIC_AUTH || "true",
    NEXT_PUBLIC_PAYMENT: process.env.NEXT_PUBLIC_PAYMENT || "true",
    NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL || "true",
    NEXT_PUBLIC_SMS: process.env.NEXT_PUBLIC_SMS || "false",
  },
};

module.exports = nextConfig;
