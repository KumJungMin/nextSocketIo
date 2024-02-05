/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["robohash.org"], // 이미지를 가져올 도메인을 추가
  },
  // !! rewrites는 next.js에서 제공하는 기능으로,
  // !! 클라이어트에서 요청하는 URL을 서버에서 다른 URL로 리다이렉트할 수 있게 해준다.
  async rewrites() {
    return [
      {
        source: "/:path",
        destination: "http://localhost:4000/:path",
      },
    ];
  },
};

export default nextConfig;
