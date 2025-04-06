/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // !! 주의: 이 옵션은 타입 검사를 완전히 건너뛰므로 주의해서 사용해야 합니다
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 