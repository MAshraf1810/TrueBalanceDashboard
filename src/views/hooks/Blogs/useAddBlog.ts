// src/hooks/Blogs/useAddBlog.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateBlog } from "../../api/blogsApi";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { showToast } from "../../services/ShowToast";

interface AddBlogResponse {
    message?: string;
}

export const useAddBlogsMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<AddBlogResponse, Error, { formData: FormData; blogId?: string }>({
        mutationFn: addOrUpdateBlog,
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });

            const isEdit = Boolean(variables.blogId);
            showToast(
                isEdit ? "Blog has been updated successfully!" : "Blog has been added successfully!",
                "success"
            );
        },
        onError: (error: unknown) => {
            showToast(handlingErrorOnStatusCode(error), "error");
        },
    });
};