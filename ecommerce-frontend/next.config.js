/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
    NEXT_PUBLIC_AUTH: process.env.NEXT_PUBLIC_AUTH || "false",
    NEXT_PUBLIC_PAYMENT: process.env.NEXT_PUBLIC_PAYMENT || "false",
    NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL || "false",
    NEXT_PUBLIC_SMS: process.env.NEXT_PUBLIC_SMS || "false",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
        }/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
