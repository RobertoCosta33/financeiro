import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },

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
