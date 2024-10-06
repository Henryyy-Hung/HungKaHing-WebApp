import {getBlogPostMetadataByLocaleAndCategory} from "@/blog/service";
import {ITEMS_PER_PAGE} from "@/blog/configs";

const generateStaticParams = async ({ params: { locale, categoryId } }) => {
    const blogPostMetadataList = await getBlogPostMetadataByLocaleAndCategory({locale, categoryId});
    const numberOfPages = Math.ceil(blogPostMetadataList.length / ITEMS_PER_PAGE) || 1;
    return (
        Array.from({length: numberOfPages}, (v, i) => {
            return {
                pageNumber: (i + 1).toString(),
            }
        })
    )
}

const Layout = ({children, params: {locale, categoryId} }) => {
    return (
        <>{children}</>
    );
}

export default Layout;

export {generateStaticParams};