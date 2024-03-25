/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/hospital",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
