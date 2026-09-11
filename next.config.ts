import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Makes D1 bindings available when using `next dev`.
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
