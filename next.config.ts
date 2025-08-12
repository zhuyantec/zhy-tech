import type { NextConfig } from "next";
// import { i18n } from './next-i18next.config.js'; // Remove i18n import

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
