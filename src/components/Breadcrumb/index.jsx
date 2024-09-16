'use client'

import styles from './index.module.css';

import {usePathname, Link} from "@/i18n/routing";
import {useLocale} from "next-intl";

const Breadcrumb = () => {

    const currentLanguage = useLocale();
    const pathname = usePathname();

    const pathSegments = pathname.split('/').filter(segment => segment !== '');

    const items = [
        {
            id: 'home',
            path: '/'
        }
    ]

    let path = '';

    for (let segment of pathSegments) {
        path = path + '/' + segment;
        items.push({
            id: segment,
            path: path,
        });
    }

    return (
        <nav className={styles.container}>
            <ol className={styles.paths}>
                {
                    items.map((item, index) => (
                        <li key={index} className={styles.path}>
                            <Link href={item.path} locale={currentLanguage}> {item.id} </Link>
                        </li>
                    ))
                }
            </ol>
        </nav>
    );
};

export default Breadcrumb;