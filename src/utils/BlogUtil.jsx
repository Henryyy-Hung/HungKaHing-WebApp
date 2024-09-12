import { globby } from 'globby';
import path from 'path';
import fs from 'fs';

const getMetadataOfAllBlogs = async () => {
    const blogPaths = await globby('src/blogs/*/*.mdx');
    const metadataList = [];
    for (let blogPath of blogPaths) {
        // remove src/blogs/ at beginning
        let subpath = blogPath.slice(10);
        let metadata = (await import(`src/blogs/${subpath}`)).metadata;
        metadata.id = blogPath.split('/')[2];
        metadata.locale = blogPath.split('/')[3];
        metadata.path = blogPath;
        metadataList.push(metadata);
    }
    return metadataList;
}

export default getMetadataOfAllBlogs;