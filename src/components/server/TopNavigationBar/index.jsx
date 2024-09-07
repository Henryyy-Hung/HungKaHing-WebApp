import styles from "./index.module.css";
import Link from "next/link";
import LanguageSwitcher from "@/components/server/LanguageSwitcher";
import {metadata} from "@/app/[lang]/layout";
import React from "react";

const TopNavigationBar = async ({ lang }) => {

    const navItems = [
        {
            title: "Home",
            url: "/"
        },
        {
            title: "Resume",
            url: "/resume"
        },
        {
            title: "Projects",
            url: "/projects"
        },
        {
            title: "Blog",
            url: "/blogs"
        },
        {
            title: "Contact",
            url: "/contact"
        }
    ];

    return (
        <div className={styles.container}>

            <Link className={styles.logo} href={`/${lang}`} scroll={false}>
                <h1>{metadata.title}</h1>
            </Link>

            <nav className={styles.nav}>
                {
                    navItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <Link href={`/${lang}${item.url}`} key={index} scroll={false}>
                                {item.title}
                            </Link>
                            {
                                index < navItems.length && <>&nbsp;&nbsp;|&nbsp;&nbsp;</>
                            }
                        </React.Fragment>
                    ))
                }
                <LanguageSwitcher currentLanguage={lang}/>
            </nav>

        </div>
    )
}

export default TopNavigationBar;