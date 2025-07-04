/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production" 

const nextConfig = {
  output: "export",
  basePath: isProd ? "/dunkstore-ecommerce" : "",
  assetPrefix: isProd ? '/dunkstore-ecommerce/' : '',

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
