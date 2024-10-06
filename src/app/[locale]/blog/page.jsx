import styles from './page.module.css';
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import PageTitleCard from "src/components/card/PageTitleCard";
import CardGallery from "src/components/layouts/CardGallery";
import {BlogCategory} from "@/blog/configs";
import pinkCloud from "@/assets/images/background/cloud.webp";
import IconFrontend from "@/assets/images/icon/front-end.png";
import IconBackend from "@/assets/images/icon/back-end.png";
import IconAI from "@/assets/images/icon/chatbot.png";
import IconProductivity from "@/assets/images/icon/time-analysis.png";
import IconLife from "@/assets/images/icon/daily-tasks.png";
import IconAll from "@/assets/images/icon/documents.png";
import CategoryNavCard from "./_components/CategoryNavCard";
import BlogPostNavCard from "./_components/BlogPostNavCard";
import {getBlogPostMetadataByLocale} from "@/blog/service";

export const generateMetadata = async ({params: {locale}}) => {
    const t = await getTranslations({locale, namespace: 'blog'});
    return {
        title: t('title'),
    };
}

const BlogPage = async ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    const t = await getTranslations('blog', locale);

    const metadataList = await getBlogPostMetadataByLocale({ locale });

    const blogCategories = [
        {
            id: BlogCategory.FRONTEND,
            icon: IconFrontend,
        },
        {
            id: BlogCategory.BACKEND,
            icon: IconBackend,
        },
        {
            id: BlogCategory.AI,
            icon: IconAI,
        },
        {
            id: BlogCategory.PRODUCTIVITY,
            icon: IconProductivity,
        },
        {
            id: BlogCategory.LIFE,
            icon: IconLife,
        },
        {
            id: BlogCategory.ALL,
            icon: IconAll,
        },
    ]

    return (
        <div className={styles.container}>

            <PageTitleCard
                image={pinkCloud}
                title={t('title')}
                description={t('description')}
            />

            <h1>{t('labels.categories')}</h1>

            <CardGallery>
                {
                    blogCategories.map((category, index) => (
                        <CategoryNavCard
                            key={index}
                            categoryId={category.id}
                            imgSrc={category.icon}
                            title={t(`labels.${category.id}`)}
                            locale={locale}
                        />
                    ))
                }
            </CardGallery>

            <h1>{t('labels.recent')}</h1>

            <CardGallery>
                {
                    metadataList.slice(0,9).map((metadata, index) => (
                        <BlogPostNavCard
                            key={index}
                            postId={metadata.id}
                            title={metadata.title}
                            description={metadata.description}
                            locale={locale}
                        />
                    ))
                }
            </CardGallery>

        </div>
    );
}

export default BlogPage;