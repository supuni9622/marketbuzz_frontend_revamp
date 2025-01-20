/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mongoose-zod'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't attempt to import these modules on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        module: false,
        path: false,
        util: false,
        buffer: false,
        crypto: false,
        fs: false,
        net: false,
        tls: false,
        child_process: false
      }
    }

    // Add mongoose-zod to external modules
    config.externals = [...(config.externals || []), 'mongoose-zod']

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig 