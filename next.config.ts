import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configuração para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/financeiro' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/financeiro/' : '',
}

export default nextConfig
