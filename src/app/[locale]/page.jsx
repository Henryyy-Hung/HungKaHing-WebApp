import styles from "./page.module.css";
import Image from "next/image";
import henry from "@/assets/images/avatar/henry.jpeg";
import {Link} from '@/i18n/routing';
import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

const HomePage = ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    const t = useTranslations('home');

    return (
        <div className={styles.container}>

            <div className={styles.card}>

                <div className={styles.left}>

                    <Image
                        className={styles.avatar}
                        src={henry}
                        alt={"Avatar"}
                        width={176}
                        height={176}
                    />
                    <h2 className={styles.name}>
                        {t("labels.name")}
                    </h2>

                    <hr className={styles.hr}/>

                    <h4>{t("labels.position")}</h4>

                    <div className={styles.social}>
                        <Link href="https://linkedin.com/in/hungkahing" target={"_blank"}>
                            {"LinkedIn"}
                        </Link>
                        &nbsp;|&nbsp;
                        <Link href="https://github.com/Henryyy-Hung" target={"_blank"}>
                            {"GitHub"}
                        </Link>
                    </div>

                </div>

                <div className={styles.right}>

                    <h3>{t("labels.greeting")}</h3>

                    <h4>{t("labels.description")}</h4>

                    <div className={styles.about}>
                        <Link href={"/about"} locale={locale} prefetch={false}>
                            {t("labels.resume")}
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link href={"/projects"} locale={locale} prefetch={false}>
                            {t("labels.projects")}
                        </Link>
                    </div>

                    <p className={styles.description}>
                        {t("labels.introduction")}
                    </p>

                </div>
            </div>

        </div>
    );
}

export default HomePage;