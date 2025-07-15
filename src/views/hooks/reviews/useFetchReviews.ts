import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../../api/reviewsApi";

export const useFetchReviews = () => {
    return useQuery({
        queryKey: ["reviews"],
        queryFn: getReviews,
        staleTime: 1000 * 60 * 1,
        retry: 3,
        refetchOnWindowFocus: false,
    });
};