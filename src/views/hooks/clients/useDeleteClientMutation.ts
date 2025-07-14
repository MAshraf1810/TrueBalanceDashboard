import { useMutation, useQueryClient } from "@tanstack/react-query";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import {
  DeleteProjectResponse,
} from "../../api/projectsApi";
import { deleteClientMutation } from "../../api/clientsApi";
import { showToast } from "../../services/ShowToast";

// Custom hook for deleting a project
export const useDeleteClientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteProjectResponse, Error, any>({
    mutationFn: deleteClientMutation,
    onSuccess: () => {
      // Invalidate the projects query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });

      // Show a success message
      showToast("Client has been Deleted successfully!", "success");
    },
    onError: (error: unknown) => {
      // Show a user-friendly error message
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};
