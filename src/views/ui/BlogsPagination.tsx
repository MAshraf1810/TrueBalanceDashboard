import { useEffect } from "react";
import CustomPagination from "./Pagination";

const BlogsPagination = ({
  blogs,
  setCurrentPage,
}: {
  blogs: any;
  setCurrentPage: (page: string) => void;
}) => {
  function getPageNumber(url: string) {
    const urlObj = new URL(url); // Parse the URL
    return urlObj.searchParams.get("page"); // Get the val ue of the 'page' query parameter
  }

  useEffect(() => {
    console.log(blogs);
    console.log(blogs.meta);
  }, [blogs]);
  return (
    <div className="mt-8">
      {blogs?.meta && (
        <CustomPagination
          links={blogs?.links}
          meta={blogs?.meta}
          handleGetFirstPage={() => {
            const result = getPageNumber(blogs?.links?.first);
            console.log("firstPage=>", result);
            if (result) setCurrentPage(result);
          }}
          handleGetLastPage={() => {
            const result = getPageNumber(blogs?.links?.last);
            if (result) setCurrentPage(result);
          }}
          handleGetNextPage={() => {
            const result = getPageNumber(blogs?.links?.next);
            if (result) setCurrentPage(result);
          }}
          handleGetPrevPage={() => {
            const result = getPageNumber(blogs?.links?.prev);
            if (result) setCurrentPage(result);
          }}
        />
      )}
    </div>
  );
};

export default BlogsPagination;
