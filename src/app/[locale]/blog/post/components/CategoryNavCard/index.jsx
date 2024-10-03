"use client"

import styles from './index.module.css';
import NavCard from "@/components/card/NavCard";
import Image from "next/image";
import IconMore from "@/assets/vectors/IconMore";

const CategoryNavCard = ({categoryId, locale, imgSrc, title, ...props}) => {
    return (
        <NavCard
            className={styles.container}
            href={`/blog/category/${categoryId}/page/1`}
            locale={locale}
            prefetch={true}
            {...props}
        >
            <Image
                src={imgSrc}
                alt={categoryId}
                className={styles.image}
                width={48}
                height={48}
                onLoad={
                    (event) => {
                        event.target.classList.add(styles.loaded)
                    }
                }
                unoptimized={true}
            />
            <h2>{title}</h2>
            <IconMore className={styles.icon}/>
        </NavCard>
    )
}

export default CategoryNavCard;