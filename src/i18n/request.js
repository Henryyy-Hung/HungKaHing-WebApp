import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {getI18nResources} from '@/i18n/configs';

// 获取请求配置
const routingConfig = getRequestConfig(async ({locale}) => {
    // 如果请求的语言不在支持的语言列表中，则返回 404
    if (!routing.locales.includes(locale)) {
        notFound();
    }
    // 获取合并的本地化资源
    const messages = await getI18nResources(locale);
    // 返回请求配置
    return {
        messages: messages,
        defaultTranslationValues: {
            Email: (chunks) => <a href={`mailto:${chunks}`}>{chunks}</a>,
        }
    };
});

export default routingConfig;
