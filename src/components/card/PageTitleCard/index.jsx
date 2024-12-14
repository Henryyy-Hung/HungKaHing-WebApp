"use client"

import styles from "./index.module.css";
import React from "react";
import Image from "next/image";

const PageTitleCard = ({image, title, description}) => {

    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            <h2>{description}</h2>
            <Image
                className={styles.background}
                src={image}
                fill={true}
                alt={title}
                priority={false}
                placeholder={"blur"}
                decoding={"async"}
                onLoad={(e) => {
                    e.target.classList.add(styles.onload);
                }}
            />
        </div>
    )
}

export default PageTitleCard;