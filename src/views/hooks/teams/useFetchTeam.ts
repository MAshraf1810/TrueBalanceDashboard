import { useQuery } from "@tanstack/react-query";
import { getTeam, Teams } from "../../api/teamsApi";

export const useFetchTeam = (teamId: string) => {
  return useQuery<Teams>({
    queryKey: ["team", teamId],
    queryFn: () => getTeam(teamId),
    staleTime: 0, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
    enabled: !!teamId,
  });
};
