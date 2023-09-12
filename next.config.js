/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.animal.go.kr", "i.pinimg.com", "i.namu.wiki"], // 이미지 호스트 도메인 추가
  },
};

module.exports = nextConfig;
