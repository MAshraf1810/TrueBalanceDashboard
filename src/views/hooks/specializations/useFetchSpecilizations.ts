import { useQuery } from "@tanstack/react-query";
import { getSpecializations } from "../../api/specilizationsApi";

export const useFetchSpecilizations = (page: string) => {
  return useQuery({
    queryKey: ["specilizations", page],
    queryFn: () => getSpecializations(page),
    staleTime: 1000 * 60 * 1,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};