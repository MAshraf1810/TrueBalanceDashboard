import { useQuery } from "@tanstack/react-query";
import { getPages, Pages } from "../../api/pagesApi";

export const useFetchPages = () => {
  return useQuery<Pages[]>({
    queryKey: ["pages"],
    queryFn: getPages,
    staleTime: 1000 * 60 * 1, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
  });
};
