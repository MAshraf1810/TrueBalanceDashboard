import { useQuery } from "@tanstack/react-query";
import { Clients, getClient } from "../../api/clientsApi";

export const useFetchClient = (clientId: string) => {
  return useQuery<Clients>({
    queryKey: ["client", clientId],
    queryFn: () => getClient(clientId),
    staleTime:  1000 * 60 * 1, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
    enabled: !!clientId,
  });
};
