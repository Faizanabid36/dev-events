import { NextRequest, NextResponse } from "next/server";

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  message: string;
}

interface RateLimitRecord {
  timestamps: number[]; // For sliding window
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodic cleanup to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore) {
    record.timestamps = record.timestamps.filter(ts => now - ts < 60 * 1000); // Keep only recent
    if (record.timestamps.length === 0) {
      rateLimitStore.delete(ip);
    }
  }
}, 60 * 1000); // Run every minute

const createRateLimiter = (config: RateLimitConfig) => {
  const finalConfig = {
    maxRequests: config.maxRequests,
    windowMs: config.windowMs,
    message: config.message || "Too many requests, please try again later.",
  };

  const getClientIp = (req: NextRequest): string => {
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwarded || realIp || "unknown";
    // More robust: take the first IP if multiple
    return String(ip).split(",")[0].trim() || "unknown";
  };

  const isRateLimited = (ip: string): boolean => {
    const now = Date.now();
    let record = rateLimitStore.get(ip);

    if (!record) {
      record = { timestamps: [] };
      rateLimitStore.set(ip, record);
    }

    // Remove timestamps outside the window
    record.timestamps = record.timestamps.filter(ts => now - ts < finalConfig.windowMs);

    if (record.timestamps.length >= finalConfig.maxRequests) {
      return true;
    }

    // Add current request timestamp
    record.timestamps.push(now);
    rateLimitStore.set(ip, record);
    return false;
  };

  const checkByIp = (ip: string): { isLimited: boolean; message?: string } => {
    if (ip === "unknown") {
      // Optionally skip rate limiting for unknown IPs or log
      console.warn("Unknown IP detected, skipping rate limit");
      return { isLimited: false };
    }

    if (isRateLimited(ip)) {
      return {
        isLimited: true,
        message: finalConfig.message,
      };
    }
    return { isLimited: false };
  };

  const check = (request: NextRequest): { isLimited: boolean; response?: NextResponse } => {
    const ip = getClientIp(request);
    const result = checkByIp(ip);
    if (result.isLimited) {
      return {
        isLimited: true,
        response: NextResponse.json(
          { message: result.message },
          { status: 429, headers: { "Retry-After": Math.ceil(finalConfig.windowMs / 1000).toString() } }
        ),
      };
    }
    return { isLimited: false };
  };

  const clear = (): void => {
    rateLimitStore.clear();
  };

  return {
    check,
    checkByIp,
    clear,
  };
};

// Factory for requests per minute limiter
export const createRequestsMinuteLimiter = (
  requestsPerMinute: number,
  windowMs: number = 60 * 1000,
) =>
  createRateLimiter({
    maxRequests: requestsPerMinute,
    windowMs,
    message: `Too many requests. Please try again in ${Math.ceil(windowMs / 1000)} seconds.`,
  });

// Export for custom configs
export { createRateLimiter };
