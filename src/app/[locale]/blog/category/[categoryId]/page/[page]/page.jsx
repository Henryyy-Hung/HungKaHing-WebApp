import {unstable_setRequestLocale} from "next-intl/server";

const generateStaticParams = async ({ params: { locale, categoryId } }) => {
    return [{page: '1'}]
}

const BlogCategoryPage = ({params: {locale, categoryId, page} }) => {

    unstable_setRequestLocale(locale);

    return (
        <div>
            <h1>{`${categoryId} ${page}`}</h1>
        </div>
    );
}

export default BlogCategoryPage;

export {generateStaticParams};