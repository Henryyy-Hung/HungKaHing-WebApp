import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx'
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX({
    options: {
        remarkPlugins: [
            remarkGfm,
        ],
        rehypePlugins: [
            rehypeSlug,
        ],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    // output: "export",
    // images: { unoptimized: true },
    experimental: {
        staleTimes: {
            dynamic: 300,
            static: 3600,
        },
    },
};

export default withNextIntl(withMDX(nextConfig));