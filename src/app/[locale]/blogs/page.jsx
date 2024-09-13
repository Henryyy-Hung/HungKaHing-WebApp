import style from './page.module.css';
import {Link} from "@/i18n/routing";
import {getLocalizedBlogList} from "@/utils/BlogUtil";

const BlogsPage = async ({ params: { locale } }) => {

    const metadataList = await getLocalizedBlogList(locale);

    return (
        <div className={style.container}>
            {
                metadataList.map((metadata, index) => (
                    <Link href={`/blogs/${metadata.id}`} key={index} className={style.card} locale={locale} prefetch={true}>
                        <h3>{metadata.title}</h3>
                        <p>{metadata.description}</p>
                    </Link>
                ))
            }
        </div>
    );
}

export default BlogsPage;