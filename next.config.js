// module.exports = {
//     images: {
//         formats: ["image/avif", "image/webp"],
//         remotePatterns: [
//           {
//             protocol: "https",
//             hostname: "lastfm.freetls.fastly.net",
//             port: "",
//             pathname: "/i/u/174s/",
//           },
//         ],
//       },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // formats: ["image/avif", "image/webp"],
        // remotePatterns: [
        //   {
        //     protocol: "https",
        //     hostname: "lastfm.freetls.fastly.net",
        //     port: "",
        //     pathname: "/i/u/174s/",
        //   },
        // ],
        domains: ["e-cdns-images.dzcdn.net"],
      },
      async headers() {
        return [
          {
            // matching all API routes
            source: "/api/:path*",
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: "*" },
              { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
              { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
          }
        ]
      },
      async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://api.example.com/:path*',
          },
        ]
      },
    
  }
   
module.exports = nextConfig