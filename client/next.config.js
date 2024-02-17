/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // remotePatterns:['localhost'],
    domains: ['localhost'],
  },
}
// module.exports = {
//   images: {
//     domains: ['localhost'],
//   },
// }
module.exports = nextConfig
