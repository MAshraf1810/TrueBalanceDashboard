import { useQuery } from "@tanstack/react-query";
import { Doctors, getDoctor } from "../../api/doctorsApi";

export const useFetchDoctor = (doctorId: string) => {
  return useQuery<Doctors>({
    queryKey: ["doctor", doctorId],
    queryFn: () => getDoctor(doctorId),
    staleTime: 0, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
    enabled: !!doctorId,
  });
};
