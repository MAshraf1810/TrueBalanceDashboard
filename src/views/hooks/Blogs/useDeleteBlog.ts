import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "../../api/blogsApi";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { showToast } from "../../services/ShowToast";

interface DeleteBlogResponse {
    message?: string;
}

export const useDeleteBlogsMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<DeleteBlogResponse, Error, number>({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["blogs"],
            });
            showToast("Blog has been deleted successfully!", "success");
        },
        onError: (error: unknown) => {
            showToast(handlingErrorOnStatusCode(error), "error");
        },
    });
};
