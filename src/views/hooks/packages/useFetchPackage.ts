import { useQuery } from "@tanstack/react-query";
import { getPackage, Packages } from "../../api/packagesApi";

export const useFetchPackage = (projectId: string) => {
  return useQuery<Packages>({
    queryKey: ["package", projectId],
    queryFn: () => getPackage(projectId),
    staleTime: 0, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
    enabled: !!projectId,
  });
};
