import {getRequestConfig} from 'next-intl/server';
import {routing} from 'src/i18n/routing';
import {i18nService} from 'src/i18n/service';
import {IntlErrorCode} from "next-intl";

// 获取请求配置
const routingConfig = getRequestConfig(async ({requestLocale}) => {
    let locale = await requestLocale;
    // 如果请求的语言不在支持的语言列表中，则使用默认语言
    if (!locale || !routing.locales.includes(locale)) {
        locale = routing.defaultLocale;
    }
    // 获取合并的本地化资源
    const messages = await i18nService.getResources(locale);
    // 返回请求配置
    return {
        locale: locale,
        messages: messages,
        onError(error) {
            if (error.code === IntlErrorCode.MISSING_MESSAGE) {
                // Missing translations are expected and should only log an error
            } else {
                // Other errors indicate a bug in the app and should be reported
                console.error(error);
            }
        },
    };
});

export default routingConfig;
