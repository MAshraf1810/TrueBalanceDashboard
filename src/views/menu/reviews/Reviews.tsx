import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ReviewTable from "./ReviewTable";
import Modal from "../../components/modals/Modal";
import TableActions from "../../components/shared/TableActions";
import LoadingModal from "../../../modals/LoadingModal";

import { showModal } from "../../components/modals/showModel";
import { closeModal } from "../../components/modals/closeModal";
import { Review } from "../../api/reviewsApi";
import { useFetchReviews } from "../../hooks/reviews/useFetchReviews";
import { useDeleteReviews } from "../../hooks/reviews/useDeleteReview";

const Reviews = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState("1");
    const [reviewId, setReviewId] = useState<number | null>(null);

    const { data: allReviews, isLoading, error, isError } = useFetchReviews();

    const itemsPerPage = 5;
    const totalPages = Math.ceil((allReviews?.length || 0) / itemsPerPage);

    const paginatedData = allReviews?.slice(
        (parseInt(currentPage) - 1) * itemsPerPage,
        parseInt(currentPage) * itemsPerPage
    );

    const {
        mutateAsync,
        isPending,
        isError: isDeleteError,
        error: deleteError,
    } = useDeleteReviews();

    const headers = ["Photo", "Name", "Job", "Text"];

    const handleEditReview = (review: Review) => {
        navigate(`/reviews/add/${review.id}`, { state: review });
    };

    const handleOpenDeleteModal = (id: number) => {
        setReviewId(id);
        showModal("review_deletion_modal");
    };

    const handleConfirmDelete = () => {
        if (reviewId !== null) mutateAsync(reviewId);
        closeModal("review_deletion_modal");
    };

    if (isLoading) return <div className="p-6">Loading...</div>;

    if (isError)
        return (
            <div role="alert" className="alert alert-error m-6">
                <span>Error: {error.message}</span>
            </div>
        );

    return (
        <div className="p-6">
            <ToastContainer />

            {isPending && <LoadingModal />}

            {isDeleteError && (
                <p className="text-red-500 font-semibold mb-4">
                    {deleteError.message}
                </p>
            )}

            <Modal
                modal_id="review_deletion_modal"
                onConfirm={handleConfirmDelete}
                meta={{
                    confirm: "Confirm",
                    Cancel: "Cancel",
                    label: "Are you sure you want to delete this review?",
                }}
            />

            <TableActions
                header="Reviews"
                add="Add Review"
                onAdd={() => navigate("/reviews/add")}
            />

            <ReviewTable
                headers={headers}
                data={paginatedData || []}
                lang="en"
                onEdit={handleEditReview}
                onDelete={handleOpenDeleteModal}
            />

            <div className="mt-4 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`btn btn-sm ${currentPage === (i + 1).toString() ? "btn-primary" : "btn-outline"}`}
                        onClick={() => setCurrentPage((i + 1).toString())}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default Reviews;
