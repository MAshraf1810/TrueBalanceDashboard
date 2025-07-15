import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../../api/blogsApi";
import { useTranslation } from "react-i18next";

export const useFetchBlogs = (currentPage: string) => {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: ["blogs", currentPage, i18n.language],
        queryFn: () => getBlogs(currentPage),
        staleTime: 1000 * 60 * 1, // Data stays fresh for 1 minute
        retry: 3, // Retry up to 3 times on error
        refetchOnWindowFocus: false, // Don’t refetch on tab focus
    });
};
