/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ['https://i.seadn.io/gcs/files/de8ac405591f36644e457386be4f3407.png?auto=format&w=1000'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.seadn.io',
        port: '',
        pathname: '/gcs/files/**',
      },
    ],
  },
}


module.exports = nextConfig
