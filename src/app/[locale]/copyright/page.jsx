import styles from './page.module.css';
import {unstable_setRequestLocale} from "next-intl/server";

const CopyrightPage = ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    const author = 'Henry';

    return (
        <div className={styles.container}>
            <article className={styles.article}>
                <h2>版权声明</h2>
                <ol>
                    <li>
                        <p>本博客的所有内容（包括但不限于文字、图片、音频、视频等），除特别注明外，其余均由{author}创作或原创，版权归{author}个人所有。</p>
                    </li>
                    <li>
                        <p>未经本人授权，任何人或机构不得复制、转载、摘编或以任何其他形式使用本站内容。如需转载，请在摘要或正文部分注明出处。</p>
                    </li>
                    <li>
                        <p>本博客允许授权使用部分文案，需注明原作者及网址，如用于商业用途，需与原作者确认。任何未授权使用内容的行为都将被视为侵权行为，{author}保留追究法律责任的权利。</p>
                    </li>
                    <li>
                        <p>本站不承担用户因使用本站所提供的服务而产生的任何直接、间接或者连带的责任和赔偿。</p>
                    </li>
                    <li>
                        <p>本声明的解释权及修改权归{author}所有，并保留随时更新网站内容和服务的权利，在不做事先通知的情况下，修改本声明产生效力。</p>
                    </li>
                </ol>
                <div className={styles.contact}>
                    <p>如对本声明有任何疑问或建议，请使用本博客页面上的相关联系方式与我取得联系。</p>
                </div>
            </article>
        </div>
    );
}

export default CopyrightPage;
