import style from './page.module.css';
import {unstable_setRequestLocale} from "next-intl/server";
import PageTitleCard from "@/components/PageTitleCard";
import forest from "@/assets/images/background/forest.png";

export const generateMetadata = async ({params: {locale}}) => {
    return {
        title: 'About',
    };
}

const AboutPage = ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    return (
        <div className={style.container}>

            <PageTitleCard
                locale={locale}
                image={forest}
                title={'About'}
                description={'My resume and experiences.'}
            />
            <h1>In Progress......</h1>
        </div>
    );
}

export default AboutPage;