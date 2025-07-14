import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingModal from "../../../modals/LoadingModal";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ImagesPreviewUi from "../../components/shared/ImagesPreviewUi";
import { useAddBlogsMutation } from "../../hooks/blogs/useAddBlogsMutation";
import { useFetchBlog } from "../../hooks/blogs/useFetchBlog";

import AddingBlogFormUi from "../../components/shared/AddingBlogFormUi";
import {
  updateBookingSchema,
  addBookingSchema,
  BookingFormValues,
} from "../../components/zod-schema/addBlogsSchema";

const AddBlogsForm: React.FC = () => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [blogId, setBlogId] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const schema = blogId ? updateBookingSchema : addBookingSchema;

  const methods = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
  });

  const {
    isError,
    isPending,
    mutateAsync: addBlogMutation,
    error,
  } = useAddBlogsMutation();

  const {
    data: blogData,
    isFetching: isBlogFetching,
    isError: isFetchBlogError,
    error: fetchBlogError,
  } = useFetchBlog(blogId || "");

  const onSubmit = () => {
    const formData = new FormData();

    // Map keys to append values dynamically
    const fields = [{ key: "status", value: "0" }];

    if (blogId) fields.push({ key: "_method", value: "put" });

    fields.forEach(({ key, value }) => formData.append(key, value));

    blogId
      ? addBlogMutation({ formData, blogId })
      : addBlogMutation({ formData });

    methods.reset();

    setTimeout(() => {
      navigate("/blogs");
    }, 2500);

    setImagesPreview([]);
  };

  useEffect(() => {
    if (params) {
      const ID = params?.id;
      if (ID) setBlogId(ID);
    }
  }, [params]);

  useEffect(() => {
    if (blogId) {
      methods.reset({
        amount: blogData?.amount,
        booking_date: blogData?.booking_date,
        first_session_date: blogData?.first_session_date,
        service: blogData?.service,
        sessions: blogData?.sessions,
        user_email: blogData?.user_name,
        total_session: blogData?.total_session,
        user_name: blogData?.user_name,
        user_location: blogData?.user_location,
        user_phone: blogData?.user_phone,
        breed: blogData?.dog?.breed,
        gender: blogData?.dog?.gender,
        name: blogData?.dog?.name,
        additional_info: blogData?.dog?.additional_info,
        aggression: blogData?.dog?.aggression ? "yes" : "no",
        destructive_behaviors: blogData?.dog?.destructive_behaviors
          ? "yes"
          : "no",
        excessive_barking_whining: blogData?.dog?.excessive_barking_whining
          ? "yes"
          : "no",
        fears_phobias: blogData?.dog?.fears_phobias ? "yes" : "no",
        other_behavioral_issues: blogData?.dog?.other_behavioral_issues
          ? "yes"
          : "no",
        separation_anxiety: blogData?.dog?.separation_anxiety ? "yes" : "no",
        age: blogData?.dog?.age,
      });
      console.log("Ayman=>>>>>", blogData?.dog?.breed);
    }
  }, [blogData, methods.reset]);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <ToastContainer />

        {/* Fetching Projects */}
        {isError && <p className="error-message">{error.message}</p>}
        {isFetchBlogError && (
          <p className="error-message">{fetchBlogError.message}</p>
        )}

        {/* Fetching Project For Update */}
        {isPending && <LoadingModal />}
        {isBlogFetching && <LoadingModal />}

        <h1 className="text-3xl font-serif font-semibold mb-4 text-white">
          Booking Details
        </h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AddingBlogFormUi />
          <div className="space-y-4 max-w-sm mt-4">
            <h1 className="text-xl my-1 font-bold ">Sessions</h1>
            {blogData?.sessions.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
              >
                <span className="text-gray-700 dark:text-gray-200 font-medium">
                  📅 {item.day}
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  🕒 {item.time}
                </span>
              </div>
            ))}
          </div>

          {imagesPreview.length > 0 && (
            <ImagesPreviewUi imagesPreviewUrls={imagesPreview} />
          )}

          {/* {oldImagesPreview?.length > 0 && (
            <OldImagesPreviewUi
              oldImagesPreview={oldImagesPreview}
              onDeleteProjectImage={(id) => handleDeleteProjectImage(id)}
            />
          )} */}
        </form>
      </div>
    </FormProvider>
  );
};

export default AddBlogsForm;
