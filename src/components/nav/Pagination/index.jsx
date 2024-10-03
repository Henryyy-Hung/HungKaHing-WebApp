import styles from './index.module.css';

const Pagination = ({numberOfPages, currentPage, siblingCount = 1, boundaryCount = 1, PageLink}) => {

    const PLACEHOLDER = '...';

    let generatePageNumbers = () => {
        const bias = 1; // space occupied by '...'
        // define the range of pages to be displayed
        let startBoundaryRange = [1, boundaryCount];
        let middleRange = [currentPage - siblingCount, currentPage + siblingCount];
        let endBoundaryRange = [numberOfPages - boundaryCount + 1, numberOfPages];
        // Adjust middle range when it goes out of boundary
        if (middleRange[0] <= startBoundaryRange[1] + 1) {
            middleRange[1] = middleRange[1] + (startBoundaryRange[1] + 1) - middleRange[0] + bias;
        }
        if (middleRange[1] >= endBoundaryRange[0] - 1) {
            middleRange[0] = middleRange[0] - (middleRange[1] - (endBoundaryRange[0] - 1) + bias);
        }
        let pagesSet = new Set();
        // Add start boundary pages
        for (let i = startBoundaryRange[0]; i <= startBoundaryRange[1]; i++) {
            pagesSet.add(i);
        }
        // Add middle pages
        for (let i = middleRange[0]; i <= middleRange[1]; i++) {
            if (i >= 1 && i <= numberOfPages) {
                pagesSet.add(i);
            }
        }
        // Add end boundary pages
        for (let i = endBoundaryRange[0]; i <= endBoundaryRange[1]; i++) {
            pagesSet.add(i);
        }
        // Convert Set to Array and sort it
        let filteredPages = Array
            .from(pagesSet)
            .filter(page => page > 0 && page <= numberOfPages)
            .sort((a, b) => a - b);
        // Insert '...' between non-continuous numbers
        let result = [];
        for (let i = 0; i < filteredPages.length; i++) {
            if (i > 0) {
                switch (filteredPages[i] - filteredPages[i - 1]) {
                    case 1:
                        break;
                    case 2:
                        result.push(filteredPages[i] - 1);
                        break;
                    default:
                        result.push(PLACEHOLDER);
                        break;
                }
            }
            result.push(filteredPages[i]);
        }
        return result;
    }

    return (
        <div className={styles.container}>

            <PageLink
                page={Math.max(currentPage - 1, 1)}
                className={`${styles.pageLink} ${currentPage === 1 ? styles.disabled : ''}`}
                disabled={currentPage === 1}
            >
                Prev
            </PageLink>

            {generatePageNumbers().map((page, index) => (
                page === PLACEHOLDER ?
                    <span
                        key={index}
                        className={`${styles.pageLink} ${styles.pseudo}`}
                    >
                        {PLACEHOLDER}
                    </span> :
                    <PageLink

                        key={index}
                        page={page}
                        className={`${styles.pageLink} ${currentPage === page ? styles.active : ''}`}
                    >
                        {page}
                    </PageLink>
            ))}

            <PageLink
                page={Math.min(currentPage + 1, numberOfPages)}
                className={`${styles.pageLink} ${currentPage === numberOfPages ? styles.disabled : ''}`}
                disabled={currentPage === numberOfPages}
            >
                Next
            </PageLink>
        </div>
    )
}

export default Pagination;