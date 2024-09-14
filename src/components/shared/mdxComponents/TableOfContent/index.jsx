"use client"

import styles from './index.module.css'

const TableOfContent = ({toc}) => {

    console.log(JSON.stringify(toc, null, 2));

    const TocItem = ({ item }) => {

        const onHrefClicked = (e) => {
            e.preventDefault();
            const id = e.target.getAttribute('href').replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 48,
                    behavior: 'smooth',
                });
            }
        }

        return (
            <li className={styles.listItem}>
                <a href={`#${item.id}`} onClick={onHrefClicked} className={styles[`h${item.depth}`]}>
                    {item.value}
                </a>
                {Array.isArray(item.items) && item.items.length > 0 && (
                    <ul className={styles.list}>
                        {item.items.map((subItem) => (
                            <TocItem key={subItem.id} item={subItem} />
                        ))}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <nav className={styles.container}>
            <ul className={styles.list}>
                {Array.isArray(toc) && toc.map((item) => (
                    <TocItem key={item.id} item={item} />
                ))}
            </ul>
        </nav>
    );
}

export default TableOfContent;