import { useMutation, useQueryClient } from "@tanstack/react-query";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { addTeamMutation } from "../../api/teamsApi";
import { AddProjectResponse } from "../../api/projectsApi";
import { showToast } from "../../services/ShowToast";

// Custom hook for deleting a project
export const useAddTeamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AddProjectResponse, Error, any>({
    mutationFn: addTeamMutation,
    onSuccess: () => {
      // Invalidate the projects query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });

      // Show a success message
      showToast("Team has been added successfully!", "success");
    },
    onError: (error: unknown) => {
      // Show a user-friendly error message
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};
