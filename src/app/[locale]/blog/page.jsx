import styles from './page.module.css';
import {Link} from "@/i18n/routing";
import BlogPostService from "@/services/blogPostService";
import {unstable_setRequestLocale} from "next-intl/server";
import PageTitleCard from "@/components/PageTitleCard";
import pinkCloud from "@/assets/images/pink-cloud.webp";
import NavCard from "src/components/NavCard";
import CardGallery from "@/components/CardGallery";

export const generateMetadata = async ({params: {locale}}) => {
    return {
        title: 'Blog',
    };
}

const BlogPage = async ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    const metadataList = await BlogPostService.getAllLocalizedMetadata({ locale });

    const categories = [
        'frontend',
        'backend',
        'ai',
        'productivity',
        'life',
        'all'
    ]

    return (
        <div className={styles.container}>

            <PageTitleCard
                locale={locale}
                image={pinkCloud}
                title={'Blog Posts'}
                description={'Some of my thoughts and experiences.'}
            />

            <h1>Categories</h1>

            <CardGallery>
                {
                    categories.map((category, index) => (
                        <NavCard
                            key={index}
                            href={`/blog/category/${category}/page/1`}
                            locale={locale}
                            prefetch={true}
                        >
                                <h2>{category}</h2>
                        </NavCard>
                    ))
                }
            </CardGallery>

            <h1>Recent Posts</h1>

            <CardGallery>
                {
                    metadataList.map((metadata, index) => (
                        <NavCard
                            href={`/blog/post/${metadata.id}`}
                            className={styles.card}
                            key={index}
                            locale={locale}
                            prefetch={true}
                            scroll={true}
                        >
                            <h3>{metadata.title}</h3>
                            <p>{metadata.description}</p>
                        </NavCard>
                    ))
                }
            </CardGallery>

        </div>
    );
}

export default BlogPage;