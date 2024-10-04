import styles from './page.module.css';
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import PageTitleCard from "src/components/card/PageTitleCard";
import starryNight from "@/assets/images/background/night.png";
import CardGallery from "src/components/layouts/CardGallery";
import NavCard from "src/components/card/NavCard";
import IconGmail from "@/assets/vectors/IconGmail";
import IconTelephone from "@/assets/vectors/IconTelephone";
import IconMapPin from "@/assets/vectors/IconMapPin";
import IconWeChat from "@/assets/vectors/IconWeChat";
import IconLinkedIn from "@/assets/vectors/IconLinkedIn";
import IconGithub from "@/assets/vectors/IconGithub";
import {useTranslations} from "next-intl";

export const generateMetadata = async ({params: {locale}}) => {
    const t = await getTranslations({locale, namespace: 'contact'});
    return {
        title: t('title'),
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
        const props = contact.props || {};
        const label = t(`fields.${contact.id}.title`);
        const value = t(`fields.${contact.id}.content`);

        switch (contact.id) {
            case 'email': {
                props['href'] = `mailto:${value}`;
                break;
            }
            case 'tel': {
                props['href'] = `tel:${value}`;
                break;
            }
            case 'location': {
                props['href'] = `https://www.google.com/maps/search/?api=1&query=${value}`;
                props['target'] = '_blank';
                break;
            }
            case 'linkedin':  case 'github': {
                props['href'] = value;
                props['target'] = '_blank';
                break;
            }
            case 'wechat': {
                break;
            }
        }
        contact.label = label;
        contact.value = value;
        contact.props = props;
    });

    return (
        <div className={styles.container}>
            <PageTitleCard
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
