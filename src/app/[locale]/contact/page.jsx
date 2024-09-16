import style from './page.module.css';
import {unstable_setRequestLocale} from "next-intl/server";

export const generateMetadata = async ({params: {locale}}) => {
    return {
        title: 'Contact',
    };
}

const ContactPage = ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    return (
        <div className={style.container}>
            <div className={style.card}>
                <h5>Contact Page in progress</h5>
            </div>
        </div>
    );
}

export default ContactPage;
