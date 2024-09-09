import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {getMergedI18nResource} from '@/i18n/configs';

export default getRequestConfig(async ({locale}) => {

    if (!routing.locales.includes(locale)) notFound();
    const messages = await getMergedI18nResource(locale);

    return {
        messages: messages
    };
});