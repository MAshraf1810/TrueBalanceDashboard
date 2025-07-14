import { useMutation, useQueryClient } from "@tanstack/react-query";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { AddProjectResponse } from "../../api/projectsApi";
import { showToast } from "../../services/ShowToast";
import { addBlogMutation } from "../../api/bookingApi";

// Custom hook for deleting a project
export const useAddBlogsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AddProjectResponse, Error, any>({
    mutationFn: addBlogMutation,
    onSuccess: () => {
      // Invalidate the projects query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });

      // Show a success message
      showToast("Blogs has been added successfully!", "success");
    },
    onError: (error: unknown) => {
      // Show a user-friendly error message
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};
