import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../api/bookingApi";
import { useTranslation } from "react-i18next";

export const useFetchBooking = (currentPage: string) => {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ["blogs", currentPage, i18n.language],
    queryFn: () => getBooking(currentPage),
    staleTime: 1000 * 60 * 1, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
  });
};
