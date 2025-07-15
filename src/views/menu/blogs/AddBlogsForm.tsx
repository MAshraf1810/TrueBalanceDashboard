import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { useAddBlogsMutation } from "../../hooks/Blogs/useAddBlog";

import LoadingModal from "../../../modals/LoadingModal";
import AddingBlogFormUi from "../../components/shared/AddBlogFormUi";
import ImagesPreviewUi from "../../components/shared/ImagesPreviewUi";

import {
    addBlogSchema,
    updateBlogSchema,
    BlogFormValues,
    UpdateBlogFormValues,
} from "../../components/zod-schema/addBlogSchema";

import { Blog } from "../../api/blogsApi";

const AddBlogsForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const blogData = location.state as Blog | null;

    const [imagesPreview, setImagesPreview] = useState<string[]>([]);
    const isEdit = Boolean(id && blogData);

    const schema = isEdit ? updateBlogSchema : addBlogSchema;

    const methods = useForm<BlogFormValues | UpdateBlogFormValues>({
        resolver: zodResolver(schema),
    });

    const {
        mutateAsync: addOrUpdateMutation,
        isPending,
        isError: isMutationError,
        error: mutationError,
    } = useAddBlogsMutation();

    const onSubmit = async (data: BlogFormValues | UpdateBlogFormValues) => {
        const formData = new FormData();

        formData.append("title[en]", data.title?.en || "");
        formData.append("title[ar]", data.title?.ar || "");
        formData.append("text[en]", data.text?.en || "");
        formData.append("text[ar]", data.text?.ar || "");

        if (isEdit) {
            if (data.status !== undefined) {
                formData.append("status", data.status);
            }
        } else {
            formData.append("status", "1");
        }

        if (data.background instanceof File) {
            formData.append("background", data.background);
        }

        if (isEdit) {
            formData.append("_method", "put");
            await addOrUpdateMutation({ formData, blogId: id });
        } else {
            await addOrUpdateMutation({ formData });
        }

        methods.reset();
        setImagesPreview([]);
        setTimeout(() => navigate("/blogs"), 2000);
    };

    useEffect(() => {
        if (isEdit && blogData) {
            methods.reset({
                title: blogData.title,
                text: blogData.text,
                status: blogData.status === 1 ? "1" : "0",
                background: blogData.background,
            });
            setImagesPreview([blogData.background]);
        }
    }, [blogData, isEdit, methods]);

    return (
        <FormProvider {...methods}>
            <div className="container mx-auto p-4">
                <ToastContainer />
                {isMutationError && (
                    <p className="text-red-600">{mutationError.message}</p>
                )}
                {isPending && <LoadingModal />}

                <h1 className="text-3xl font-bold text-white mb-4">
                    {isEdit ? "Edit Blog" : "Add Blog"}
                </h1>

                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <AddingBlogFormUi
                        imagesPreview={imagesPreview}
                        setImagesPreview={setImagesPreview}
                    />

                    {imagesPreview.length > 0 && (
                        <ImagesPreviewUi imagesPreviewUrls={imagesPreview} />
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary mt-6 w-full md:w-fit"
                    >
                        {isEdit ? "Update Blog" : "Add Blog"}
                    </button>
                </form>
            </div>
        </FormProvider>
    );
};

export default AddBlogsForm;