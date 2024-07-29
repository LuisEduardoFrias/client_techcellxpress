/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_BASE_API_TECHCELLXPRESS:"https://api-techcellxpress-4addxp125-luiseduardofrias-projects.vercel.app/api-docs/",
    NEXT_PUBLIC_SECRET_JWT_KEY: "3$t0EsUnC0d1guBonoS3cr3t0_p@r@-t0d0L4@p"
  },
}

module.exports = nextConfig
