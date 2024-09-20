import styles from './page.module.css';
import BlogPostService from "@/services/blogPostService";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import PageTitleCard from "@/components/PageTitleCard";
import pinkCloud from "@/assets/images/background/cloud.webp";
import NavCard from "src/components/NavCard";
import CardGallery from "@/components/CardGallery";
import BlogCategory from "@/constants/blogCategory";
import Image from "next/image";

import IconFrontend from "@/assets/images/icon/front-end.png";
import IconBackend from "@/assets/images/icon/back-end.png";
import IconAI from "@/assets/images/icon/chatbot.png";
import IconProductivity from "@/assets/images/icon/time-analysis.png";
import IconLife from "@/assets/images/icon/daily-tasks.png";
import IconAll from "@/assets/images/icon/documents.png";
import IconMore from "@/assets/vectors/IconMore";

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
                        <NavCard
                            key={index}
                            href={`/blog/category/${category.id}/page/1`}
                            locale={locale}
                            className={styles.category}
                            prefetch={true}
                        >
                            <Image src={category.icon} alt={category.id} width={48} height={48} unoptimized={true} />
                            <h2>{t(`categories.${category.id}`)}</h2>
                            <IconMore className={styles.icon}/>
                        </NavCard>
                    ))
                }
            </CardGallery>

            <h1>{t('sections.recent')}</h1>

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