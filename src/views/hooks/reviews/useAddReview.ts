import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateReview } from "../../api/reviewsApi";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { showToast } from "../../services/ShowToast";

interface AddReviewResponse {
    message?: string;
}

export const useAddReviews = () => {
    const queryClient = useQueryClient();

    return useMutation<AddReviewResponse, Error, { formData: FormData; reviewId?: string }>({
        mutationFn: addOrUpdateReview,
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });

            const isEdit = Boolean(variables.reviewId);
            showToast(
                isEdit ? "Review has been updated successfully!" : "Review has been added successfully!",
                "success"
            );
        },
        onError: (error: unknown) => {
            showToast(handlingErrorOnStatusCode(error), "error");
        },
    });
};