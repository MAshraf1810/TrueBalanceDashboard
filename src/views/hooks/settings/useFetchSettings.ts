import { useQuery } from "@tanstack/react-query";
import { getSettings, Settings } from "../../api/settingsApi";

export const useFetchSettings= () => {
  return useQuery<Settings>({
    queryKey: ["settings"],
    queryFn: getSettings,
    staleTime: 1000 * 60 * 1, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
  });
};
