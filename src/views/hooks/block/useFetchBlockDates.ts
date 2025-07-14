import { useQuery } from "@tanstack/react-query";
import { BlockedItem, getBlockDates } from "../../api/blockDatesApi";

export const useFetchBlockDates = () => {
  return useQuery<BlockedItem[]>({
    queryKey: ["blockDates"],
    queryFn: getBlockDates,
    staleTime: 0, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
  });
};
