import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addServiceMutation } from "../../api/servicesApi";
import { showToast } from "../../services/ShowToast";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";

export const useAddServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addServiceMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      showToast("Service has been submitted successfully!", "success");
    },
    onError: (error: any) => {
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};