import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx'

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
    // images: { unoptimized: true },
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

export default withNextIntl(withMDX(nextConfig));