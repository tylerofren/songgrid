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
        domains: ["lastfm.freetls.fastly.net"],
      },
  }
   
module.exports = nextConfig