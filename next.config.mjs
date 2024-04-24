/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/doctor",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
