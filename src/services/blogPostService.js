import fs from "fs/promises";
import {globby} from "globby";
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import {visit} from "unist-util-visit";

const BlogPostService = {

    pathPrefix: 'src/blogs/',
    pathSuffix: '.mdx',

    isPostExist: async ({postId, locale}) => {
        const path = `${BlogPostService.pathPrefix}${postId}/${locale}${BlogPostService.pathSuffix}`;
        return (await globby(path)).length > 0;
    },

    getModule: async ({postId, locale}) => {
        if (! (await BlogPostService.isPostExist({postId, locale}))) {
            return null;
        }
        return await import(`src/blogs/${postId}/${locale}.mdx`);
    },

    getAllPaths : async () => {
        return await globby(`${BlogPostService.pathPrefix}**/*${BlogPostService.pathSuffix}`);
    },

    getAllPathsByPostId: async ({postId}) => {
        return await globby(`${BlogPostService.pathPrefix}${postId}/*${BlogPostService.pathSuffix}`);
    },

    getSupportedLocalesByPostId: async ({postId}) => {
        const paths = await BlogPostService.getAllPathsByPostId({postId});
        const locales = [];
        for (let path of paths) {
            const {locale} = await BlogPostService.getIdAndLocaleByPath({path});
            locales.push(locale);
        }
        return locales;
    },

    getAllPathsByLocale: async ({locale}) => {
        return await globby(`${BlogPostService.pathPrefix}**/${locale}*${BlogPostService.pathSuffix}`);
    },

    getIdAndLocaleByPath: async ({path}) => {
        path = path.slice(BlogPostService.pathPrefix.length, -BlogPostService.pathSuffix.length);
        const segments = path.split('/');
        return {
            postId: segments[0],
            locale: segments[1]
        }
    },

    getMetadata: async ({postId, locale}) => {
        const metadata = (await BlogPostService.getModule({postId, locale}))?.metadata;
        if (!metadata) return null;
        metadata.id = postId;
        metadata.locale = locale;
        return metadata;
    },

    getComponent: async ({postId, locale}) => {
        return (await BlogPostService.getModule({postId, locale}))?.default;
    },

    getText: async ({postId, locale}) => {
        if (! (await BlogPostService.isPostExist({postId, locale}))) {
            return null;
        }
        return await fs.readFile(`${BlogPostService.pathPrefix}${postId}/${locale}${BlogPostService.pathSuffix}`, 'utf-8');
    },

    getAllMetadata: async () => {
        const paths = await BlogPostService.getAllPaths();
        const metadataList = [];
        for (let path of paths) {
            const {postId, locale} = await BlogPostService.getIdAndLocaleByPath({path});
            const metadata = await BlogPostService.getMetadata({postId, locale});
            metadataList.push(metadata);
        }
        return metadataList;
    },

    getAllLocalizedMetadata: async ({locale}) => {
        const paths = await BlogPostService.getAllPathsByLocale({locale});
        const metadataList = [];
        for (let path of paths) {
            const {postId, locale} = await BlogPostService.getIdAndLocaleByPath({path});
            const metadata = await BlogPostService.getMetadata({postId, locale});
            metadataList.push(metadata);
        }
        return metadataList;
    },

    getTableOfContents: async ({postId, locale}) => {
        // Get the content of the blog post
        const mdxContent = await BlogPostService.getText({postId, locale});
        // Create a processor
        const processor = unified()
            .use(remarkParse)
            .use(remarkMdx)
            .use(remarkRehype)
            .use(rehypeSlug);
        // Process the content to generate the tree
        const tree =  processor.runSync(processor.parse(mdxContent));
        // Extract headings from the tree
        const headings = [];
        visit(tree, 'element', (node) => {
            if (node.tagName && node.tagName.startsWith('h')) {
                const id = node.properties.id;
                const text = node.children.find(child => child.type === 'text')?.value || '';
                if (!id || !text) {
                    return;
                }
                headings.push({
                    depth: parseInt(node.tagName.replace('h', ''), 10),
                    value: text,
                    id: id,
                });
            }
        });
        // Extract headings from the tree and create nested structure
        const nestHeadings = (headings) => {
            const nested = [];
            const stack = [{ items: nested, depth: 1 }];

            headings.forEach((heading) => {
                while (stack.length > 1 && stack[stack.length - 1].depth >= heading.depth) {
                    stack.pop();
                }
                const currentLayer = stack[stack.length - 1].items;
                const newItem = {
                    ...heading,
                    items: [],
                };
                currentLayer.push(newItem);
                stack.push({ ...newItem, depth: heading.depth });
            });

            return nested;
        };
        return nestHeadings(headings);
    },

    getReadingTime: async ({ postId, locale, wordsPerMinute = 200, charsPerMinute = 600 }) => {
        const content = await BlogPostService.getText({ postId, locale });
        if (!content) return null;

        let readingTime;
        const isChinese = /[\u4E00-\u9FFF]/.test(content); // 简单判断是否包含中文字符
        if (isChinese) {
            const charCount = content.length;
            readingTime = Math.ceil(charCount / charsPerMinute);
        } else {
            const wordCount = content.split(/\s+/).length;
            readingTime = Math.ceil(wordCount / wordsPerMinute);
        }
        return readingTime;
    }
}

export default BlogPostService;