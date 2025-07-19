import {Enumify} from "enumify";

class I18nNamespace extends Enumify {

    static COMMON = new I18nNamespace(
        'common'
    )

    static HOME = new I18nNamespace(
        'home'
    )

    static ABOUT = new I18nNamespace(
        'about'
    )

    static PROJECTS = new I18nNamespace(
        'projects'
    )

    static BLOG = new I18nNamespace(
        'blog'
    )

    static CONTACT = new I18nNamespace(
        'contact'
    )

    static DISCLAIMER = new I18nNamespace(
        'disclaimer'
    )

    static COPYRIGHT = new I18nNamespace(
        'copyright'
    )

    static {
        this.closeEnum()
    }

    constructor(id) {
        super()
        this.id = id
    }
}

export {
    I18nNamespace
}
