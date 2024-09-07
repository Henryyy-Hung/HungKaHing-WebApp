'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation as orgUseTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getI18nOptions, getI18nResource, languages, cookieName } from '@/i18n/configs';

const IS_SERVER = typeof window === 'undefined';

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(resourcesToBackend(getI18nResource))
    .init({
        ...getI18nOptions(),
        lng: undefined, // Let the client side detect the language
        detection: {
            order: ['path', 'htmlTag', 'cookie', 'navigator'],
        },
        preload: IS_SERVER ? languages : [],
    })
    .then(() => {
        console.log('i18n initialized');
    })
    .catch((error) => {
        console.error('i18n initialization failed', error);
    });


function useLanguageChange(lng, i18n, cookies, setCookie) {
    // 当前语言状态管理
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)

    useEffect(() => {
        if (activeLng === i18n.resolvedLanguage) return
        setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])

    useEffect(() => {
        if (!lng || i18n.resolvedLanguage === lng) return
        i18n.changeLanguage(lng)
    }, [lng, i18n])

    useEffect(() => {
        if (cookies.i18next === lng) return
        setCookie(cookieName, lng, { path: '/' })
    }, [lng, cookies.i18next])
}

export function useTranslation(language, namespace, options) {

    const [cookies, setCookie] = useCookies([cookieName]);
    const translationResult = orgUseTranslation(namespace, options);
    const { i18n } = translationResult;

    if (IS_SERVER && language && i18n.resolvedLanguage !== language) {
        i18n.changeLanguage(language);
    } else {
        // eslint-disable-next-line
        const [currentLanguage, setCurrentLanguage] = useState(i18n.resolvedLanguage);
        // eslint-disable-next-line
        useEffect(() => {
            if (currentLanguage === i18n.resolvedLanguage) return;
            setCurrentLanguage(i18n.resolvedLanguage);
        }, [currentLanguage, i18n.resolvedLanguage]);
        // eslint-disable-next-line
        useEffect(() => {
            if (!language || i18n.resolvedLanguage === language) return;
            i18n.changeLanguage(language);
        }, [language, i18n]);
        // eslint-disable-next-line
        useEffect(() => {
            if (cookies[cookieName] === language) return;
            setCookie(cookieName, language, { path: '/' });
        }, [language, cookies, setCookie]);
    }
    return translationResult;
}