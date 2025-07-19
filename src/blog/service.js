import {globby} from "globby";
import fs from "fs/promises";
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import {visit} from "unist-util-visit";
import readingTimeUtil from "@/utils/readingTimeUtil";


class BlogPostPathService {

    static PATH_PREFIX = 'src/blog/posts';
    static PATH_SUFFIX = '.mdx';

    static async get({postId, locale}) {
        const path = `${this.PATH_PREFIX}/**/${postId}/${locale}${this.PATH_SUFFIX}`;
        const files = await globby(path);
        return files.length === 1 ? files[0] : null;
    }

    static async getMultipleByPostId({postId}) {
        return await globby(`${this.PATH_PREFIX}/**/${postId}/*${this.PATH_SUFFIX}`);
    }

    static async getMultipleByLocale({locale}) {
        return await globby(`${this.PATH_PREFIX}/**/*/${locale}${this.PATH_SUFFIX}`);
    }

    static async getAll() {
        return await globby(`${this.PATH_PREFIX}/**/*${this.PATH_SUFFIX}`);
    }

    static async retrieveKeys({path}) {
        path = path.slice(this.PATH_PREFIX.length, -this.PATH_SUFFIX.length);
        const segments = path.split('/');
        return {
            postId: segments[segments.length - 2],
            locale: segments[segments.length - 1]
        }
    }
}

class BlogPostContentService {

    static async #getModule({postId, locale}) {
        const path = await BlogPostPathService.get({postId, locale});
        if (!path) { return null }
        const partialPath = path.slice(BlogPostPathService.PATH_PREFIX.length);
        return await import(`src/blog/posts${partialPath}`);
    }

    static async getComponent({postId, locale}) {
        return (await this.#getModule({postId, locale}))?.default;
    }

    static async getRawMetadata({postId, locale}) {
        const metadata = (await this.#getModule({postId, locale}))?.metadata;
        if (!metadata) { return null }
        metadata.id = postId;
        metadata.locale = locale;
        return metadata;
    }

    static async getText({postId, locale}) {
        const path = await BlogPostPathService.get({postId, locale});
        if (!path) { return null }
        return await fs.readFile(path, 'utf-8');
    }
}

class BlogPostInfoService {

    static async getSupportedLocalesOfPost({postId}) {
        const paths = await BlogPostPathService.getMultipleByPostId({postId});
        const locales = [];
        for (let path of paths) {
            const {locale} = await BlogPostPathService.retrieveKeys({path});
            locales.push(locale);
        }
        return locales;
    }

    static async getReadingTimeOfPost({postId, locale}) {
        const content = await BlogPostContentService.getText({postId, locale});
        if (!content) return null;
        return readingTimeUtil.calculateReadingTime({textContent: content});
    }

    static async getTableOfContentsOfPost({postId, locale}) {
        const mdxContent = await BlogPostContentService.getText({postId, locale});
        if (!mdxContent) { return null }
        const processor = unified()
            .use(remarkParse)
            .use(remarkMdx)
            .use(remarkRehype)
            .use(rehypeSlug);
        const tree =  processor.runSync(processor.parse(mdxContent));
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
    }

    static async getInfoOfPost({postId, locale}) {
        const metadata = await BlogPostContentService.getRawMetadata({postId, locale});
        if (!metadata) { return null }
        metadata.tableOfContents = await this.getTableOfContentsOfPost({postId, locale});
        metadata.readingTime = await this.getReadingTimeOfPost({postId, locale});
        return metadata;
    }

    static async getInfoOfPostsByLocale({locale}) {
        const paths = await BlogPostPathService.getMultipleByLocale({locale});
        const metadataList = [];
        for (let path of paths) {
            const {postId, locale} = await BlogPostPathService.retrieveKeys({path});
            const metadata = await this.getInfoOfPost({postId, locale});
            metadataList.push(metadata);
        }
        metadataList.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        return metadataList;
    }

    static async getInfoOfPostsByLocaleAndCategory({locale, categoryId}) {
        const metadataList = await this.getInfoOfPostsByLocale({locale});
        if (categoryId === 'all') { return metadataList }
        return metadataList.filter(metadata => metadata.category === categoryId);
    }
}

const pathPrefix = 'src/blog/posts';
const pathSuffix = '.mdx';

// Blog Post Path Services

const getBlogPostPath = async ({postId, locale}) => {
    const path = `${pathPrefix}/**/${postId}/${locale}${pathSuffix}`;
    const files = await globby(path);
    return files.length === 1 ? files[0] : null;
}

const getAllBlogPostPaths = async () => {
    return await globby(`${pathPrefix}/**/*${pathSuffix}`);
}

const getBlogPostPathsByPostId = async ({postId}) => {
    return await globby(`${pathPrefix}/**/${postId}/*${pathSuffix}`);
}

const getBlogPostPathsByLocale = async ({locale}) => {
    return await globby(`${pathPrefix}/**/*/${locale}${pathSuffix}`);
}

const retrieveKeysFromBlogPostPath =  async ({path}) => {
    path = path.slice(pathPrefix.length, -pathSuffix.length);
    const segments = path.split('/');
    return {
        postId: segments[segments.length - 2],
        locale: segments[segments.length - 1]
    }
}

// Blog Post Content Services

const getBlogPostModule = async ({postId, locale}) => {
    const path = await getBlogPostPath({postId, locale});
    if (!path) { return null }
    const partialPath = path.slice(pathPrefix.length);
    return await import(`src/blog/posts${partialPath}`);
}

const getBlogPostText = async ({postId, locale}) => {
    const path = await getBlogPostPath({postId, locale});
    if (!path) { return null }
    return await fs.readFile(path, 'utf-8');
}

const getBlogPostComponent = async ({postId, locale}) => {
    return (await getBlogPostModule({postId, locale}))?.default;
}

// Blog Post Utility Services

const getSupportedLocalesByBlogPostId = async ({postId}) => {
    const paths = await getBlogPostPathsByPostId({postId});
    const locales = [];
    for (let path of paths) {
        const {locale} = await retrieveKeysFromBlogPostPath({path});
        locales.push(locale);
    }
    return locales;
}

const getBlogPostReadingTime = async ({ postId, locale}) => {
    const content = await getBlogPostText({postId, locale});
    if (!content) return null;
    return readingTimeUtil.calculateReadingTime({textContent: content});
}


const getBlogPostTableOfContents = async ({postId, locale}) => {
    // Get the content of the blog post
    const mdxContent = await getBlogPostText({postId, locale});
    if (!mdxContent) { return null }
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
}

// Blog Post Metadata Services

const getBlogPostMetadata = async ({postId, locale}) => {
    const metadata = (await getBlogPostModule({postId, locale}))?.metadata;
    if (!metadata) { return null }
    metadata.id = postId;
    metadata.locale = locale;
    metadata.tableOfContents = await getBlogPostTableOfContents({postId, locale});
    metadata.readingTime = await getBlogPostReadingTime({postId, locale});
    return metadata;
}

const getBlogPostMetadataByLocale = async ({locale}) => {
    const paths = await getBlogPostPathsByLocale({locale});
    const metadataList = [];
    for (let path of paths) {
        const {postId, locale} = await retrieveKeysFromBlogPostPath({path});
        const metadata = await getBlogPostMetadata({postId, locale});
        metadataList.push(metadata);
    }
    metadataList.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    return metadataList;
}

const getBlogPostMetadataByLocaleAndCategory = async ({locale, categoryId}) => {
    const metadataList = await getBlogPostMetadataByLocale({locale});
    if (categoryId === 'all') { return metadataList }
    return metadataList.filter(metadata => metadata.category === categoryId);
}

export {
    getSupportedLocalesByBlogPostId,
    getBlogPostMetadata,
    getBlogPostMetadataByLocale,
    getBlogPostMetadataByLocaleAndCategory,
    getBlogPostComponent,
}
