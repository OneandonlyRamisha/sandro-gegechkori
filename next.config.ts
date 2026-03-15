import type { NextConfig } from "next";
import { config } from "dotenv";

config({ path: "./config.env" });

const nextConfig: NextConfig = {
  env: {
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
};

export default nextConfig;
