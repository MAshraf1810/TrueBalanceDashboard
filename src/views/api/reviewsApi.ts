import apiClient from "../services/api-client";
import { Meta, Pagination } from "../ui/Pagination";

// Review Interfaces
export interface Review {
    id: number;
    text: {
        en: string;
        ar: string;
    };
    image: string;
}

export interface FetchReviewsResponse {
    data: {
        data: Review[];
        links: Pagination;
        meta: Meta;
    };
    status: string;
    error: string;
    code: number;
}

export interface FetchReviewResponse {
    data: Review;
}

// Endpoint
const REVIEW_API_ENDPOINT = "/api/dashboard/reviews";

// Fetch reviews (paginated)
export const getReviews = async () => {
    const res = await apiClient.get<{ data: Review[] }>(
        "/api/dashboard/reviews"
    );
    return res.data.data;
};

// Fetch single review
export const getReview = async (reviewId: string) => {
    const res = await apiClient.get<FetchReviewResponse>(
        `${REVIEW_API_ENDPOINT}/${reviewId}`
    );
    return res.data.data;
};

// Create or update review
export const addOrUpdateReview = async ({
    formData,
    reviewId,
}: {
    formData: FormData;
    reviewId?: string;
}) => {
    const ENDPOINT = reviewId
        ? `${REVIEW_API_ENDPOINT}/${reviewId}`
        : REVIEW_API_ENDPOINT;

    const res = await apiClient.post(ENDPOINT, formData);
    return res.data.data;
};

// Delete review
export const deleteReview = async (reviewId: string | number) => {
    const res = await apiClient.post(`${REVIEW_API_ENDPOINT}/${reviewId}`, {
        _method: "delete",
    });
    return res.data.data;
};
