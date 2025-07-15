import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import LoadingModal from "../../../modals/LoadingModal";
import AddReviewFormUi from "../../components/shared/AddReviewFormUi";
import ImagesPreviewUi from "../../components/shared/ImagesPreviewUi";

import {
    addReviewSchema,
    updateReviewSchema,
    ReviewFormValues,
    UpdateReviewFormValues,
} from "../../components/zod-schema/addReviewSchema";

import { Review } from "../../api/reviewsApi";
import { useAddReviews } from "../../hooks/reviews/useAddReview";

const AddReviewForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const reviewData = location.state as Review | null;

    const [imagesPreview, setImagesPreview] = useState<string[]>([]);
    const isEdit = Boolean(id && reviewData);

    const schema = isEdit ? updateReviewSchema : addReviewSchema;

    const methods = useForm<ReviewFormValues | UpdateReviewFormValues>({
        resolver: zodResolver(schema),
    });

    const {
        mutateAsync: addOrUpdateMutation,
        isPending,
        isError: isMutationError,
        error: mutationError,
    } = useAddReviews();

    const onSubmit = async (data: ReviewFormValues | UpdateReviewFormValues) => {
        const formData = new FormData();

        formData.append("text[en]", data.text?.en || "");
        formData.append("text[ar]", data.text?.ar || "");

        if (data.image instanceof File) {
            formData.append("image", data.image);
        }

        if (isEdit) {
            formData.append("_method", "put");
            await addOrUpdateMutation({ formData, reviewId: id });
        } else {
            await addOrUpdateMutation({ formData });
        }

        methods.reset();
        setImagesPreview([]);
        setTimeout(() => navigate("/reviews"), 2000);
    };

    useEffect(() => {
        if (isEdit && reviewData) {
            methods.reset({
                text: reviewData.text,
                image: reviewData.image,
            });
            setImagesPreview([reviewData.image]);
        }
    }, [reviewData, isEdit, methods]);

    return (
        <FormProvider {...methods}>
            <div className="container mx-auto p-4">
                <ToastContainer />
                {isMutationError && <p className="text-red-600">{mutationError.message}</p>}
                {isPending && <LoadingModal />}

                <h1 className="text-3xl font-bold text-white mb-4">
                    {isEdit ? "Edit Review" : "Add Review"}
                </h1>

                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <AddReviewFormUi
                        imagesPreview={imagesPreview}
                        setImagesPreview={setImagesPreview}
                    />

                    {imagesPreview.length > 0 && (
                        <ImagesPreviewUi imagesPreviewUrls={imagesPreview} />
                    )}

                    <button type="submit" className="btn btn-primary mt-6 w-full md:w-fit">
                        {isEdit ? "Update Review" : "Add Review"}
                    </button>
                </form>
            </div>
        </FormProvider>
    );
};

export default AddReviewForm;