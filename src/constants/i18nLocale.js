import {Enumify} from "enumify";

class I18nLocale extends Enumify {

    static EN = new I18nLocale(
        'en',
        'English',
        'English',
        null
    )

    static ZH = new I18nLocale(
        'zh',
        'Chinese',
        '中文',
        I18nLocale.EN.isoCode
    )

    static ZH_HANS = new I18nLocale(
        'zh-Hans',
        'Chinese (Simplified)',
        '简体中文',
        I18nLocale.ZH.isoCode
    )

    static ZH_HANT = new I18nLocale(
        'zh-Hant',
        'Chinese (Traditional)',
        '繁體中文',
        I18nLocale.ZH.isoCode
    )
    //
    // static ZH_CN = new I18nLocale(
    //     'zh-CN',
    //     'Chinese (China)',
    //     '简体中文（中国）',
    //     I18nLocale.ZH_HANS.isoCode
    // )
    //
    // static ZH_SG = new I18nLocale(
    //     'zh-SG',
    //     'Chinese (Singapore)',
    //     '简体中文（新加坡）',
    //     I18nLocale.ZH_HANS.isoCode
    // )
    //
    // static ZH_MY = new I18nLocale(
    //     'zh-MY',
    //     'Chinese (Malaysia)',
    //     '简体中文（马来西亚）',
    //     I18nLocale.ZH_HANS.isoCode
    // )
    //
    // static ZH_TW = new I18nLocale(
    //     'zh-TW',
    //     'Chinese (Taiwan)',
    //     '繁體中文（台灣）',
    //     I18nLocale.ZH_HANT.isoCode
    // )
    //
    // static ZH_HK = new I18nLocale(
    //     'zh-HK',
    //     'Chinese (Hong Kong)',
    //     '繁體中文（香港）',
    //     I18nLocale.ZH_HANT.isoCode
    // )
    //
    // static ZH_MO = new I18nLocale(
    //     'zh-MO',
    //     'Chinese (Macao)',
    //     '繁體中文（澳門）',
    //     I18nLocale.ZH_HANT.isoCode
    // )

    static {
        this.closeEnum()
    }

    constructor(isoCode, nameInEnglish, nameInLocal, isoCodeOfFallbackLocale) {
        super()
        this.isoCode = isoCode;
        this.nameInEnglish = nameInEnglish;
        this.nameInLocal = nameInLocal;
        this.isoCodeOfFallbackLocale = isoCodeOfFallbackLocale;
    }

    static get localeIsoCodes() {
        let result = [];
        for (const locale of I18nLocale.enumValues) {
            if (typeof locale === 'I18nLocale') {
                result.push(locale.isoCode);
            }
        }

        return result;
    }

    static getLocaleByIsoCode(isoCode) {
        for (const locale of I18nLocale.enumValues) {
            if (locale.isoCode === isoCode) return locale;
        }
        return null;
    }
}

export {
    I18nLocale
}
