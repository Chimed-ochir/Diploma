/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  reactStrictMode: false,
};

// module.exports = nextConfig;

export default withNextIntl(nextConfig);
