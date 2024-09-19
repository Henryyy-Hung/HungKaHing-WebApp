const generateStaticParams = async ({ params: { locale } }) => {

    const categories = [
        'frontend',
        'backend',
        'ai',
        'productivity',
        'life',
        'all'
    ]

    return categories.map(categoryId => ({categoryId}));
}

const Layout = ({children, params: {locale, categoryId} }) => {

    return (
        <div>
            {children}
        </div>
    );
}

export default Layout;

export {generateStaticParams};