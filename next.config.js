/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  ...nextConfig,
  reactStrictMode: false,
  async rewrites() {
    return [
      // Custom rewrite rule to handle double slashes
      {
        source: "/:path*",
        destination: "/:path*",
      },
      {
        source: "/about",
        destination: "/",
      },
    ];
  },
};
