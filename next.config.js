/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_BASE_API_TECHCELLXPRESS: "http://localhost:3000",
    NEXT_PUBLIC_SECRET_JWT_KEY: "3$t0EsUnC0d1guBonoS3cr3t0_p@r@-t0d0L4@p"
  },
}

module.exports = nextConfig
