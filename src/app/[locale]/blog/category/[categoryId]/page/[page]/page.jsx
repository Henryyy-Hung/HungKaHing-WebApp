

const BlogCategoryPage = ({params: {locale, categoryId, page} }) => {
    return (
        <div>
            <h1>{`${categoryId} ${page}`}</h1>
        </div>
    );
}

export default BlogCategoryPage;