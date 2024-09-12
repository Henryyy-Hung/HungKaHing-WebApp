import {globby} from 'globby';

const dirPrefix = 'src/blogs/';

export const getBlogList = async () => {
    const blogPaths = await globby(`${dirPrefix}/*/*.mdx`);
    const blogList = [];
    for (let blogPath of blogPaths) {
        const path = blogPath.replace(dirPrefix, '')
        const segments = path.split('/');
        const blogId = segments[0];
        const blogLocale = segments[1].split('.')[0];
        let metadata = (await import(`src/blogs/${path}`)).metadata;
        metadata.id = blogId;
        metadata.locale = blogLocale;
        blogList.push(metadata);
    }
    return blogList;
}

const getBestFitBlogLocale = async (blogId, locale) => {
    const blogPaths = await globby(`${dirPrefix}${blogId}/*.mdx`);
    const blogLocales = blogPaths.map(blogPath => blogPath.replace(dirPrefix, '').split('/')[1].split('.')[0]);
    let supportedLocale = blogLocales.find(blogLocale => blogLocale === locale);
    if (!supportedLocale) {
        locale = locale.split('-')[0]
        supportedLocale = blogLocales.find(blogLocale => blogLocale.startsWith(locale));
    }
    return supportedLocale;
}

export const getBlogContent = async (blogId, locale) => {
    const bestFitLocale = await getBestFitBlogLocale(blogId, locale);
    if (!bestFitLocale) return null
    return (await import(`src/blogs/${blogId}/${bestFitLocale}.mdx`)).default;
}

export const getLocalizedBlogList = async (locale) => {
    const blogList = await getBlogList();
    const blogMap = {};
    const output = [];
    for (let blog of blogList) {
        if (!blogMap[blog.id]) {
            blogMap[blog.id] = {};
        }
        blogMap[blog.id][blog.locale] = blog;
    }
    for (let blogId in blogMap) {
        const bestFitLocale = await getBestFitBlogLocale(blogId, locale);
        if (bestFitLocale) output.push(blogMap[blogId][bestFitLocale]);
    }
    return output;
}


