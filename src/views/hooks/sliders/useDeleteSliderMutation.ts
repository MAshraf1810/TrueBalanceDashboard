import { useMutation, useQueryClient } from "@tanstack/react-query";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { DeleteProjectResponse } from "../../api/projectsApi";
import { deleteSliderMutation } from "../../api/slidersApi";
import { showToast } from "../../services/ShowToast";

// Custom hook for deleting a project
export const useDeleteSliderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteProjectResponse, Error, any>({
    mutationFn: deleteSliderMutation,
    onSuccess: () => {
      // Invalidate the projects query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["sliders"],
      });

      // Show a success message
      showToast("Slider has been Deleted successfully!", "success");
    },
    onError: (error: unknown) => {
      // Show a user-friendly error message
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};
