import { useEffect } from "react";
import CustomPagination from "./Pagination";

interface ReviewsPaginationProps {
    reviews: any;
    setCurrentPage: (page: string) => void;
}

const ReviewsPagination = ({ reviews, setCurrentPage }: ReviewsPaginationProps) => {
    const getPageNumber = (url: string | null) => {
        if (!url) return null;
        const urlObj = new URL(url);
        return urlObj.searchParams.get("page");
    };

    useEffect(() => {
        console.log("Reviews pagination data:", reviews);
    }, [reviews]);

    return (
        <div className="mt-8">
            {reviews?.meta && (
                <CustomPagination
                    links={reviews.links}
                    meta={reviews.meta}
                    handleGetFirstPage={() => {
                        const page = getPageNumber(reviews.links?.first);
                        if (page) setCurrentPage(page);
                    }}
                    handleGetLastPage={() => {
                        const page = getPageNumber(reviews.links?.last);
                        if (page) setCurrentPage(page);
                    }}
                    handleGetNextPage={() => {
                        const page = getPageNumber(reviews.links?.next);
                        if (page) setCurrentPage(page);
                    }}
                    handleGetPrevPage={() => {
                        const page = getPageNumber(reviews.links?.prev);
                        if (page) setCurrentPage(page);
                    }}
                />
            )}
        </div>
    );
};

export default ReviewsPagination;