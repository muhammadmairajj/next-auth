/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**"
            }
        ]
    }
    // images: {
    //     domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com']
    // }
}

module.exports = nextConfig
