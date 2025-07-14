import { useMutation, useQueryClient } from "@tanstack/react-query";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { DeleteProjectResponse } from "../../api/projectsApi";
import { showToast } from "../../services/ShowToast";
import { deleteDoctorMutation } from "../../api/doctorsApi";

// Custom hook for deleting a project
export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteProjectResponse, Error, any>({
    mutationFn: deleteDoctorMutation,
    onSuccess: () => {
      // Invalidate the projects query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });

      // Show a success message
      showToast("Doctor has been Deleted successfully!", "success");
    },
    onError: (error: unknown) => {
      // Show a user-friendly error message
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};
