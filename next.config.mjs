/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "blob",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
