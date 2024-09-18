import style from './page.module.css';
import {unstable_setRequestLocale} from "next-intl/server";
import PageTitleCard from "@/components/PageTitleCard";
import starryNight from "@/assets/images/starry-night.png";

export const generateMetadata = async ({params: {locale}}) => {
    return {
        title: 'Contact',
    };
}

const ContactPage = ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    return (
        <div className={style.container}>
            <PageTitleCard
                locale={locale}
                image={starryNight}
                title={'Contact'}
                description={'You can reach me at any time.'}
            />
        </div>
    );
}

export default ContactPage;
