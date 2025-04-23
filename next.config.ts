import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default nextConfig;
