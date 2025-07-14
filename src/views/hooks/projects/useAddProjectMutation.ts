import { useMutation, useQueryClient } from "@tanstack/react-query";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { addProjectMutation, AddProjectResponse } from "../../api/projectsApi";
import { showToast } from "../../services/ShowToast";

// Custom hook for deleting a project
export const useAddProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AddProjectResponse, Error, any>({
    mutationFn: addProjectMutation,
    onSuccess: () => {
      // Invalidate the projects query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      // Show a success message
      showToast("Project has been added successfully!", "success");
    },
    onError: (error: unknown) => {
      // Show a user-friendly error message
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};
