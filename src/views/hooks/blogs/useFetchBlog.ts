import { useQuery } from "@tanstack/react-query";
import { Booking, getBlog } from "../../api/bookingApi";

export const useFetchBlog = (blogId: string) => {
  return useQuery<Booking>({
    queryKey: ["blog", blogId],
    queryFn: () => getBlog(blogId),
    staleTime: 0, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
    enabled: !!blogId,
  });
};
