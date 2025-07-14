import { useQuery } from "@tanstack/react-query";
import { getSlider, Sliders } from "../../api/slidersApi";

export const useFetchSlider = (sliderId: string) => {
  return useQuery<Sliders>({
    queryKey: ["slider", sliderId],
    queryFn: () => getSlider(sliderId),
    staleTime: 0, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
    enabled: !!sliderId,
  });
};
