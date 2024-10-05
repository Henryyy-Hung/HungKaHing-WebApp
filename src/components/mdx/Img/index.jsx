"use client"

import styles from './index.module.css'
import Image from 'next/image'

const Img = ({src, alt, ...props}) => {
    return (
        <div className={styles.container}>
            <Image
                className={styles.image}
                src={src}
                alt={alt}
                placeholder={"blur"}
                onLoad={(e) => {
                    e.target.classList.add(styles.onload);
                }}
                {...props}
            />
        </div>
    )
}

export default Img;