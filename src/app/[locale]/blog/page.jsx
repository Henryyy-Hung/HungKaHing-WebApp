import style from './page.module.css';
import {Link} from "@/i18n/routing";
import BlogPostService from "@/services/blogPostService";

const BlogsPage = async ({ params: { locale } }) => {

    const metadataList = await BlogPostService.getAllLocalizedMetadata({ locale });

    return (
        <div className={style.container}>
            {
                metadataList.map((metadata, index) => (
                    <Link href={`/blog/${metadata.id}`} key={index} className={style.card} locale={locale} prefetch={true}>
                        <h3>{metadata.title}</h3>
                        <p>{metadata.description}</p>
                    </Link>
                ))
            }
        </div>
    );
}

export default BlogsPage;