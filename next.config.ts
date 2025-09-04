import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configuração para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Desabilitar ESLint para build de produção
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Desabilitar type checking para build de produção
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
