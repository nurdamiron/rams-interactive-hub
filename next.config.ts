import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove "output: export" to enable server-side features (API routes)
  // output: "export",
  // distDir: "out",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  // Proxy ESP32 requests through Next.js server to avoid CORS.
  // IP задаётся через env ESP32_HOST (без пересборки — лучше прописать
  // статический DHCP-lease для ESP32 на роутере). Fallback — AP-адрес 192.168.4.1
  // недоступен отсюда, поэтому по умолчанию текущий STA-адрес.
  async rewrites() {
    const esp32Host = process.env.ESP32_HOST || '192.168.110.65';
    return [
      {
        source: '/esp32-api/:path*',
        destination: `http://${esp32Host}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
