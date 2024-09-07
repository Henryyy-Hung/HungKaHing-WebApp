'use client'

import { useTranslation } from '@/i18n/client'

export const Component = ({ lang }) => {
    const { t } = useTranslation(lang)
    return (
        <footer>
            <p>{t('test.sample')}</p>
        </footer>
    )
}

export default Component
