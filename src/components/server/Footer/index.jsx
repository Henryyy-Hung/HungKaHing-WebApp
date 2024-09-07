import styles from "./index.module.css";
import Link from "next/link";
import React from "react";

const Footer = async ({ lang }) => {

    return (
        <div className={styles.container}>
            <section className={styles.contact}>
                <div>
                    <h5>Email</h5>
                    <Link href="mailto:henry.k.h.hung@gmail.com">henry.k.h.hung@gmail.com</Link>
                </div>
                <div>
                    <h5>Location</h5>
                    <span>Hong Kong / Shanghai</span>
                </div>
                <div>
                    <h5>Social</h5>
                    <Link href="https://linkedin.com/in/hungkahing" target={"_blank"}>LinkedIn</Link>
                    &nbsp;|&nbsp;
                    <Link href="https://github.com/Henryyy-Hung" target={"_blank"}>GitHub</Link>
                </div>
            </section>
            <section className={styles.copyright}>
                <p>© 2024 by Henry Hung - All Rights Reserved</p>
            </section>
        </div>
    )
}

export default Footer;