// next.config.js

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/fotos-gratis/**',
      },
      {
        protocol: 'https',
        hostname: 'ylgijxahvdaromxwwgib.supabase.co',
        port: '',
        pathname: '/storage/v1/object/sign/buscavan/**',
      },
    ],
  },
}
