import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import henry from "@/assets/images/henry.jpeg";
import { useTranslation } from '@/i18n'
import TestComponent from "@/components/client/TestComponent";

const HomePage = async ({ params: { lang } }) => {

    const { t } = await useTranslation(lang)


    return (
        <div className={styles.container}>

            {t('home.title')}

            <div className={styles.card}>

                <div className={styles.left}>

                    <Image className={styles.avatar} src={henry} alt={"Avatar"} width={176} height={176} />
                    <h4 className={styles.name}>
                        Hung Ka Hing
                        <br/>
                        Henry
                    </h4>

                    <hr className={styles.hr}/>

                    <h5>Software Engineer</h5>

                    <div className={styles.social}>
                        <Link href="https://linkedin.com/in/hungkahing" target={"_blank"}>LinkedIn</Link>
                        &nbsp;|&nbsp;
                        <Link href="https://github.com/Henryyy-Hung" target={"_blank"}>GitHub</Link>
                    </div>

                </div>

                <div className={styles.right}>

                    <h3>Hello</h3>

                    <h4>Here is who I am & what I do</h4>

                    <div className={styles.about}>
                        <Link href="/resume">
                            Resume
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link href="/projects">
                            Projects
                        </Link>
                    </div>

                    <p className={styles.description}>
                        Hello! I&apos;m Henry.<br/>
                        <br/>
                        Passionate about creating impactful projects, I&apos;ve dedicated myself to software development.
                        As a software engineer and full-stack developer, I specialize in React.js, Next.js, Express.js,
                        Quart.py. My goal is to consistently produce high-quality work that benefits the community.<br/>
                    </p>

                </div>
            </div>
            <TestComponent />
            <TestComponent />
        </div>
    );
}

export default HomePage;
