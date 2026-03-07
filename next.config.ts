import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbopackFileSystemCacheForDev: true,
    // reactCompiler: true,  // This compiler automatically memoizes values and functions, reducing the need for manual useMemo and useCallback hooks in client components
    useCache: true,
  },
};

export default nextConfig;
