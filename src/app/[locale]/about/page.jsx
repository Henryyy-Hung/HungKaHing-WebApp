import styles from './page.module.css';
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import PageTitleCard from "src/components/card/PageTitleCard";
import forest from "@/assets/images/background/forest.png";
import {useTranslations} from "next-intl";
import TimeLineView from "./_components/TimeLineView";
import logoHKU from '@/assets/images/logo/hku.png';
import logoHuawei from '@/assets/images/logo/huawei.png';
import logoWongFutNam from '@/assets/images/logo/wongfutnam.png';
import logoDocPro from '@/assets/images/logo/docpro.png';

export const generateMetadata = async ({params: {locale}}) => {
    const t = await getTranslations({locale, namespace: 'about'});
    return {
        title: t('title'),
    };
}

const AboutPage = ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    const t = useTranslations('about');

    const logos = {
        "hku": logoHKU,
        "huawei": logoHuawei,
        "wfn": logoWongFutNam,
        "docpro": logoDocPro,
    }

    const content = Array.from({length: 10}, (v, i) => {
        const sectionId = i+1;
        const sectionKeyPrefix = `sections.${sectionId}`;
        const sectionTitle = t(`${sectionKeyPrefix}.title`);
        if (sectionTitle.includes(sectionKeyPrefix)) { return null }
        const subSections = Array.from({length: 10}, (v, i) => {
            const subSectionId = 10-i;
            const subSectionKeyPrefix = `${sectionKeyPrefix}.sections.${subSectionId}`;
            const subSectionTitle = t(`${subSectionKeyPrefix}.title`);
            if (subSectionTitle.includes(subSectionKeyPrefix)) { return null }
            const subSectionSubtitle = t(`${subSectionKeyPrefix}.subtitle`);
            const subSectionLocation = t(`${subSectionKeyPrefix}.location`);
            const subSectionTime = t(`${subSectionKeyPrefix}.time`);
            const subSectionLogoId = t(`${subSectionKeyPrefix}.logo`);
            const subSectionLines =  Array.from({length: 10}, (v, i) => {
                const key = `${subSectionKeyPrefix}.line${i + 1}`;
                const line = t(key);
                return line.includes(key) ? null : line;
            }).filter((v) => v)
            return {
                logo: logos[subSectionLogoId],
                time: subSectionTime,
                title: subSectionTitle,
                subtitle: subSectionSubtitle,
                location: subSectionLocation,
                lines: subSectionLines,
            }
        })
        return {
            title: sectionTitle,
            subSections: subSections.filter((v) => v),
        }
    }).filter((v) => v);

    return (
        <div className={styles.container}>

            <PageTitleCard
                image={forest}
                title={t('title')}
                description={t('description')}
            />

            <div className={styles.card} style={{gap: 16}}>
                <h2 className={styles.title}>
                    {t('sections.introduction.title')}
                </h2>
                <span style={{fontSize: 18}}>
                    {t('sections.introduction.content')}
                </span>
            </div>

            {
                content.map((section, index) => {
                    return (
                        <div className={styles.card} key={index}>
                            <h2 className={styles.title}>
                                {section.title}
                            </h2>
                            <TimeLineView sections={section.subSections} />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default AboutPage;