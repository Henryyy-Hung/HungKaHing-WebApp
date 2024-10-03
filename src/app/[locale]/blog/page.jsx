import styles from './page.module.css';
import BlogPostService from "@/services/blogPostService";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import PageTitleCard from "src/components/card/PageTitleCard";
import pinkCloud from "@/assets/images/background/cloud.webp";
import CardGallery from "src/components/layouts/CardGallery";
import BlogCategory from "@/constants/blogCategory";
import IconFrontend from "@/assets/images/icon/front-end.png";
import IconBackend from "@/assets/images/icon/back-end.png";
import IconAI from "@/assets/images/icon/chatbot.png";
import IconProductivity from "@/assets/images/icon/time-analysis.png";
import IconLife from "@/assets/images/icon/daily-tasks.png";
import IconAll from "@/assets/images/icon/documents.png";
import CategoryNavCard from "@/app/[locale]/blog/post/components/CategoryNavCard";
import BlogPostNavCard from "@/app/[locale]/blog/post/components/BlogPostNavCard";

export const generateMetadata = async ({params: {locale}}) => {
    return {
        title: 'Blog',
    };
}

const BlogPage = async ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    const t = await getTranslations('blog', locale);

    const metadataList = await BlogPostService.getAllLocalizedMetadata({ locale });

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
                locale={locale}
                image={pinkCloud}
                title={t('title')}
                description={t('description')}
            />

            <h1>{t('sections.categories')}</h1>

            <CardGallery>
                {
                    blogCategories.map((category, index) => (
                        <CategoryNavCard
                            key={index}
                            categoryId={category.id}
                            imgSrc={category.icon}
                            title={t(`categories.${category.id}`)}
                            locale={locale}
                        />
                    ))
                }
            </CardGallery>

            <h1>{t('sections.recent')}</h1>

            <CardGallery>
                {
                    metadataList.map((metadata, index) => (
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