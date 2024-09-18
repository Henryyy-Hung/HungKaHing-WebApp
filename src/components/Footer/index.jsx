import styles from "./index.module.css";
import Link from "next/link";
import React from "react";
import {useTranslations} from "next-intl";

const Footer = ({locale}) => {

    const t = useTranslations('common.footer');

    return (
        <div className={styles.container}>
            <address className={styles.contact}>
                <div>
                    <h3>{"Email"}</h3>
                    <Link href={`mailto:${"henry.k.h.hung@gmail.com"}`}>
                        {"henry.k.h.hung@gmail.com"}
                    </Link>
                </div>
                <div>
                    <h3>{"Location"}</h3>
                    <span>
                        {"Hong Kong / Shanghai"}
                    </span>
                </div>
                <div>
                    <h3>{"Social"}</h3>
                    <Link href={"https://linkedin.com/in/hungkahing"} target={"_blank"}>
                        {"LinkedIn"}
                    </Link>
                    &nbsp;|&nbsp;
                    <Link href={"https://github.com/Henryyy-Hung"} target={"_blank"}>
                        {"GitHub"}
                    </Link>
                </div>
            </address>

            <div className={styles.links}>
                <Link href={'/sitemap.xml'}>Sitemap</Link>
                •
                <Link href={'/copyright'}>Copyright</Link>
                •
                <Link href={'/disclaimer'}>Disclaimer</Link>
            </div>

            <section className={styles.copyright}>
                <p>
                    {"Copyright © 2024 Hung Ka Hing. All Rights Reserved."}
                </p>
            </section>
        </div>
    )
}

export default Footer;