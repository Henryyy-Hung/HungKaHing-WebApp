import style from './page.module.css';
import {globby} from "globby";
import {Link} from "@/i18n/routing";
import getMetadataOfAllBlogs from "@/utils/BlogUtil";

export const dynamic = 'force-static';

const BlogsPage = async ({ params: { locale } }) => {

    const blogPaths = await globby(`src/blogs/*/*.mdx`);
    let blogIds = blogPaths.map(blogPath => blogPath.split('/')[2]);
    blogIds = [...new Set(blogIds)];

    const metadataList = await getMetadataOfAllBlogs();

    return (
        <div className={style.container}>
            {
                metadataList.map((metadata, index) => (
                    <Link href={`/blogs/${metadata.id}`} key={index} className={style.card} locale={locale} prefetch={false}>
                        <p>
                            {metadata.title}
                            <br/>
                            {metadata.description}
                        </p>
                    </Link>
                ))
            }
        </div>
    );
}

export default BlogsPage;