import styles from './index.module.css';
import Image from 'next/image';

const TimeLineCard = ({title, sections}) => {

    const TimeLineItem = ({time, logo, title, subtitle, location, list}) => {
        return (
            <section className={styles.section}>
                <div className={styles.row}>
                    <div className={styles.circle}></div>
                    <time className={styles.time}>
                        {time}
                    </time>
                </div>
                <div className={styles.row}>
                    <div className={styles.logo}>
                        <Image src={logo} alt="logo"/>
                    </div>
                    <div className={styles.details}>
                        <h3 className={styles.title}>
                            {title}
                        </h3>
                        <h4 className={styles.subtitle}>
                            {subtitle}
                        </h4>
                        <address className={styles.location}>
                            {location}
                        </address>
                        <ul className={styles.list}>
                            {
                                list.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                {title}
            </h2>
            <article className={styles.content}>
                <hr className={styles.timeline} />
                <div className={styles.sections}>
                    {
                        sections.map((section, index) => {
                            return (
                                <TimeLineItem
                                    key={index}
                                    time={section.time}
                                    logo={section.logo}
                                    title={section.title}
                                    subtitle={section.subtitle}
                                    location={section.location}
                                    list={section.lines}
                                />
                            )
                        })
                    }
                    <div style={{height: '1rem'}}></div>
                </div>
            </article>
        </div>
)
}

export default TimeLineCard;