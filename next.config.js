/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    BASE_API_TECHCELLXPRESS: "http://localhost:3000",
    SECRET_JWT_KEY: "3$t0EsUnC0d1guBonoS3cr3t0_p@r@-t0d0L4@p"
  },
}

module.exports = nextConfig
