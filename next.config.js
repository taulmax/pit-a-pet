/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.animal.go.kr",
      "pitapetbucket.s3.ap-northeast-2.amazonaws.com",
    ], // 이미지 호스트 도메인 추가
  },
};

module.exports = nextConfig;
