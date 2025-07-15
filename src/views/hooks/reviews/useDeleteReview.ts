import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../api/reviewsApi";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { showToast } from "../../services/ShowToast";

interface DeleteReviewResponse {
    message?: string;
}

export const useDeleteReviews = () => {
    const queryClient = useQueryClient();

    return useMutation<DeleteReviewResponse, Error, number>({
        mutationFn: deleteReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            showToast("Review has been deleted successfully!", "success");
        },
        onError: (error: unknown) => {
            showToast(handlingErrorOnStatusCode(error), "error");
        },
    });
};