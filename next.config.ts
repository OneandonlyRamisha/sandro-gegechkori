import type { NextConfig } from "next";
import { config } from "dotenv";

config({ path: "./config.env" });

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
