/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "firebasestorage.googleapis.com"
            }
        ]
    }
}

module.exports = nextConfig
