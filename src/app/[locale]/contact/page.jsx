import styles from './page.module.css';
import {unstable_setRequestLocale} from "next-intl/server";
import PageTitleCard from "@/components/PageTitleCard";
import starryNight from "@/assets/images/background/night.png";
import CardGallery from "@/components/CardGallery";
import NavCard from "@/components/NavCard";
import IconGmail from "@/assets/vectors/IconGmail";
import IconTelephone from "@/assets/vectors/IconTelephone";
import IconMapPin from "@/assets/vectors/IconMapPin";
import IconWeChat from "@/assets/vectors/IconWeChat";
import IconLinkedIn from "@/assets/vectors/IconLinkedIn";
import IconGithub from "@/assets/vectors/IconGithub";
import {useTranslations} from "next-intl";

export const generateMetadata = async ({params: {locale}}) => {
    return {
        title: 'Contact',
    };
}

const ContactPage = ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    const t = useTranslations('contact');

    let contactList = [
        {
            id: 'email',
            icon: IconGmail,
        },
        {
            id: 'tel',
            icon: IconTelephone,
        },
        {
            id: 'location',
            icon: IconMapPin,
        },
        {
            id: 'wechat',
            icon: IconWeChat,
        },
        {
            id: 'linkedin',
            icon: IconLinkedIn,
        },
        {
            id: 'github',
            icon: IconGithub,
        }
    ]

    contactList.forEach((contact) => {
        contact.label = t(`fields.${contact.id}.label`);
        contact.value = t(`fields.${contact.id}.value`);
        let props = contact.props || {};
        // if start with 'http', then it's a link
        if (/^http/.test(contact.value)) {
            props = {
                href: contact.value,
                target: '_blank'
            }
        }
        else if (/@/.test(contact.value)) {
            props = {
                href: `mailto:${contact.value}`
            }
        }
        else if (/\+/.test(contact.value)) {
            props = {
                href: `tel:${contact.value}`
            }
        }
        contact.props = props;
    });

    return (
        <div className={styles.container}>
            <PageTitleCard
                locale={locale}
                image={starryNight}
                title={t('title')}
                description={t('description')}
            />
            <CardGallery>
                {
                    contactList.map((contact, index) => {
                        const Icon = contact.icon;
                        return (
                            <NavCard
                                {...contact.props}
                                key={index}
                                className={styles.card}
                                locale={locale}
                                prefetch={false}
                                scroll={false}
                            >
                                <Icon className={styles.icon} key={index}/>
                                <div className={styles.content} key={index}>
                                    <h2 className={styles.title}>{contact.label}</h2>
                                    <p>{contact.value}</p>
                                </div>
                            </NavCard>
                        );
                    })
                }
            </CardGallery>
        </div>
    );
}

export default ContactPage;
