import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx'
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX({
    options: {
        remarkPlugins: [
            remarkGfm,    // 支持 GitHub Flavored Markdown
        ],
        rehypePlugins: [
            rehypeSlug,   // 为标题元素添加 id 属性
        ],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        staleTimes: {
            dynamic: 300,
            static: 3600,
        },
    },
    // output: "export",
    // images: { unoptimized: true },
    // redirects: async () => {
    //     return [
    //         {
    //             source: '/',
    //             destination: '/en',
    //             permanent: true,
    //         },
    //     ]
    // },
};

export default withNextIntl(withMDX(nextConfig));