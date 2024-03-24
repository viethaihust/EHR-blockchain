/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/admin',
                destination: '/admin/hospitals',
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
