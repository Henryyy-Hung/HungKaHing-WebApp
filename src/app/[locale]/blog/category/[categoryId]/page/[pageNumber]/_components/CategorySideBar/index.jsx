"use client"

import styles from './index.module.css';
import {BlogCategory} from "@/blog/configs";
import {Link} from "@/i18n/routing";
import SideBarCard from "@/components/card/SideBarCard";
import {useTranslations} from "next-intl";

const CategorySideBar = ({locale, className, categoryId, ...props}) => {

    const t = useTranslations('blog');

    return (
        <SideBarCard
            title={t('labels.categories')}
            isFullSize={true}
            {...props}
        >
            {Object.values(BlogCategory).map((category, index) => (
                <Link
                    key={index}
                    href={`/blog/category/${category}/page/1`}
                    locale={locale}
                    className={`${styles.categoryLink} ${category === categoryId ? styles.active : ''}`.trim()}
                >
                    {t(`labels.${category}`)}
                </Link>
            ))}
        </SideBarCard>
    )
}

export default CategorySideBar;