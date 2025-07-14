import { useMutation, useQueryClient } from "@tanstack/react-query";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import {
  DeleteProjectResponse,
  deleteProjectImage,
} from "../../api/projectsApi";
import { showToast } from "../../services/ShowToast";

// Custom hook for deleting a project
export const useDeleteProjectImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteProjectResponse, Error, any>({
    mutationFn: deleteProjectImage,
    onSuccess: () => {
      // Invalidate the projects query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["project"],
      });

      // Show a success message
      showToast("Project Image has been Deleted successfully!", "success");
    },
    onError: (error: unknown) => {
      // Show a user-friendly error message
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};
