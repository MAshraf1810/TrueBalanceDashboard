import { useMutation, useQueryClient } from "@tanstack/react-query";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { AddProjectResponse } from "../../api/projectsApi";
import { addSettingMutation } from "../../api/settingsApi";
import { showToast } from "../../services/ShowToast";

// Custom hook for deleting a project
export const useAddSettingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AddProjectResponse, Error, any>({
    mutationFn: addSettingMutation,
    onSuccess: () => {
      // Invalidate the projects query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });

      // Show a success message
      showToast("Settings has been added successfully!", "success");
    },
    onError: (error: unknown) => {
      // Show a user-friendly error message
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};
