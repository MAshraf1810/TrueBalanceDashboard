import { useQuery } from "@tanstack/react-query";
import { getProjects, Projects } from "../../api/projectsApi";

export const useFetchProjects = () => {
  return useQuery<Projects[]>({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 1, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
  });
};
