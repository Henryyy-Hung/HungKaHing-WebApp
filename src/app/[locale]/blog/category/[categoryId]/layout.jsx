import {BlogCategory} from "@/blog/configs";

const generateStaticParams = async ({ params: { locale } }) => {
    const categories = Object.values(BlogCategory);
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