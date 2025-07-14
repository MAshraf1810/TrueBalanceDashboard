import { useMutation, useQueryClient } from "@tanstack/react-query";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { DeleteProjectResponse } from "../../api/projectsApi";
import { showToast } from "../../services/ShowToast";
import { deleteBlogMutation } from "../../api/bookingApi";

// Custom hook for deleting a project
export const useDeleteBlogsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteProjectResponse, Error, any>({
    mutationFn: deleteBlogMutation,
    onSuccess: () => {
      // Invalidate the projects query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });

      // Show a success message
      showToast("Blogs has been Deleted successfully!", "success");
    },
    onError: (error: unknown) => {
      // Show a user-friendly error message
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};
