import { useMutation, useQueryClient } from "@tanstack/react-query";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { DeleteProjectResponse } from "../../api/projectsApi";
import { deleteServiceMutation } from "../../api/servicesApi";
import { showToast } from "../../services/ShowToast";

// Custom hook for deleting a project
export const useDeleteServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteProjectResponse, Error, any>({
    mutationFn: deleteServiceMutation,
    onSuccess: () => {
      // Invalidate the projects query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });

      // Show a success message
      showToast("Service has been Deleted successfully!", "success");
    },
    onError: (error: unknown) => {
      // Show a user-friendly error message
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};
