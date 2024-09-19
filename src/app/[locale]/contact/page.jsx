import styles from './page.module.css';
import {unstable_setRequestLocale} from "next-intl/server";
import PageTitleCard from "@/components/PageTitleCard";
import starryNight from "@/assets/images/starry-night.png";
import CardGallery from "@/components/CardGallery";
import NavCard from "@/components/NavCard";
import IconGmail from "@/assets/vectors/IconGmail";
import IconTelephone from "@/assets/vectors/IconTelephone";
import IconMapPin from "@/assets/vectors/IconMapPin";
import IconWeChat from "@/assets/vectors/IconWeChat";
import IconLinkedIn from "@/assets/vectors/IconLinkedIn";
import IconGithub from "@/assets/vectors/IconGithub";

export const generateMetadata = async ({params: {locale}}) => {
    return {
        title: 'Contact',
    };
}

const ContactPage = ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    const contactList = [
        {
            id: 'email',
            value: 'henry.k.h.hung@gmail.com',
            icon: IconGmail,
            props: {
                href: `mailto:henry.k.h.hung@gmail.com`,
            }
        },
        {
            id: 'tel',
            value: '+852 6598 XXXX',
            icon: IconTelephone,
            props: {
                href: 'tel:+8526598XXXX',
            }
        },
        {
            id: 'location',
            value: 'Hong Kong / Shanghai, China',
            icon: IconMapPin,
            props: {
            }
        },
        {
            id: 'wechat',
            value: 'HenryyyHung',
            icon: IconWeChat,
            props: {
            }
        },
        {
            id: 'linkedin',
            value: 'https://linkedin.com/in/hungkahing',
            icon: IconLinkedIn,
            props: {
                href: 'https://linkedin.com/in/hungkahing',
                target: '_blank'
            }
        },
        {
            id: 'github',
            value: 'https://github.com/Henryyy-Hung',
            icon: IconGithub,
            props: {
                href: 'https://github.com/Henryyy-Hung',
                target: '_blank'
            }
        }
    ]

    return (
        <div className={styles.container}>
            <PageTitleCard
                locale={locale}
                image={starryNight}
                title={'Contact'}
                description={'You can reach me at any time.'}
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
                                    <h2 className={styles.title}>{contact.id}</h2>
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
