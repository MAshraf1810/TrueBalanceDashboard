import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import BlogsTable from "./BlogsTable";
import Modal from "../../components/modals/Modal";
import TableActions from "../../components/shared/TableActions";
import BlogsPagination from "../../ui/BlogsPagination";
import LoadingModal from "../../../modals/LoadingModal";

import { showModal } from "../../components/modals/showModel";
import { closeModal } from "../../components/modals/closeModal";
import { useDeleteBlogsMutation } from "../../hooks/Blogs/useDeleteBlog";
import { useFetchBlogs } from "../../hooks/Blogs/useFetchBlogs";
import { Blog } from "../../api/blogsApi";

const Blogs = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<string>("1");
    const [blogId, setBlogId] = useState<number | null>(null);

    const { data, isLoading, error, isError } = useFetchBlogs(currentPage);

    const {
        mutateAsync,
        isPending,
        isError: isDeleteError,
        error: deleteError,
    } = useDeleteBlogsMutation();

    const headers = ["Image", "Title", "Text"];

    const handleEditBlog = (blog: Blog) => {
        navigate(`/blogs/add/${blog.id}`, { state: blog });
    };


    const handleOpenDeleteModal = (id: number) => {
        setBlogId(id);
        showModal("blogs_deletion_modal");
    };

    const handleConfirmDelete = () => {
        if (blogId !== null) mutateAsync(blogId);
        closeModal("blogs_deletion_modal");
    };

    if (isLoading)
        return (
            <div className="p-6">
                <div className="skeleton h-10 w-48 mb-4"></div>
                <div className="skeleton h-96 w-full"></div>
            </div>
        );

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

            {/* Delete confirmation modal */}
            <Modal
                modal_id="blogs_deletion_modal"
                onConfirm={handleConfirmDelete}
                meta={{
                    confirm: "Confirm",
                    Cancel: "Cancel",
                    label: "Are you sure you want to delete this blog?",
                }}
            />

            <TableActions
                header="Blogs"
                add="Add Blog"
                onAdd={() => navigate("/blogs/add")}
            />

            <BlogsTable
                headers={headers}
                data={data?.data || []}
                lang="en"
                onEdit={handleEditBlog}
                onDelete={handleOpenDeleteModal}
            />

            <BlogsPagination
                setCurrentPage={(page) => setCurrentPage(page)}
                blogs={data}
            />
        </div>
    );
};

export default Blogs;