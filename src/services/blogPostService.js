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

    validatePath: async ({postId, locale}) => {
        const path = `${BlogPostService.pathPrefix}${postId}/${locale}${BlogPostService.pathSuffix}`;
        return (await globby(path)).length > 0;
    },

    getModule: async ({postId, locale}) => {
        if (! (await BlogPostService.validatePath({postId, locale}))) {
            return null;
        }
        return await import(`src/blogs/${postId}/${locale}.mdx`);
    },

    getAllPaths : async () => {
        return await globby(`${BlogPostService.pathPrefix}**/*${BlogPostService.pathSuffix}`);
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
        if (! (await BlogPostService.validatePath({postId, locale}))) {
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
        const mdxContent = await BlogPostService.getText({postId, locale});
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
            const stack = [{ items: nested }];

            headings.forEach((heading) => {
                while (stack.length > heading.depth) {
                    stack.pop();
                }
                const item = {
                    ...heading,
                    items: [],
                };
                stack[stack.length - 1].items.push(item);
                stack.push(item);
            });

            return nested;
        };
        const nestedHeadings = nestHeadings(headings);

        console.log(JSON.stringify(nestedHeadings, null, 2));

        return nestedHeadings;
    }

}

export default BlogPostService;