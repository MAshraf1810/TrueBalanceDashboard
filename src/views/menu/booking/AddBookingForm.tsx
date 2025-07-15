import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import LoadingModal from "../../../modals/LoadingModal";
import ImagesPreviewUi from "../../components/shared/ImagesPreviewUi";
import AddingBookingFormUi from "../../components/shared/AddingBookingFormUi";

import {
  addBookingSchema,
  updateBookingSchema,
  BookingFormValues,
} from "../../components/zod-schema/addBookingsSchema";

import { useAddBookingMutation } from "../../hooks/booking/useAddBookingMutation";
import { useFetchBooking } from "../../hooks/booking/useFetchBooking";

const AddBookingForm = () => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [bookingId, setBookingId] = useState<string>("");

  const params = useParams();
  const navigate = useNavigate();

  const schema = bookingId ? updateBookingSchema : addBookingSchema;

  const methods = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
  });

  const {
    isError,
    isPending,
    mutateAsync: mutateBooking,
    error,
  } = useAddBookingMutation();

  const {
    data: bookingData,
    isFetching: isFetchingBooking,
    isError: isFetchError,
    error: fetchError,
  } = useFetchBooking(bookingId);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("status", "0");
    if (bookingId) formData.append("_method", "put");

    mutateBooking(bookingId ? { formData, bookingId } : { formData });

    methods.reset();
    setImagesPreview([]);

    setTimeout(() => {
      navigate("/bookings");
    }, 2000);
  };

  useEffect(() => {
    if (params?.id) setBookingId(params.id);
  }, [params]);

  useEffect(() => {
    if (bookingId && bookingData) {
      methods.reset({
        amount: bookingData.amount,
        booking_date: bookingData.booking_date,
        first_session_date: bookingData.first_session_date,
        service: bookingData.service,
        sessions: bookingData.sessions,
        total_session: bookingData.total_session,
        user_name: bookingData.user_name,
        user_location: bookingData.user_location,
        user_email: bookingData.user_email,
        user_phone: bookingData.user_phone,
        name: bookingData.dog?.name,
        breed: bookingData.dog?.breed,
        gender: bookingData.dog?.gender,
        age: bookingData.dog?.age,
        additional_info: bookingData.dog?.additional_info,
        aggression: bookingData.dog?.aggression ? "yes" : "no",
        destructive_behaviors: bookingData.dog?.destructive_behaviors ? "yes" : "no",
        excessive_barking_whining: bookingData.dog?.excessive_barking_whining ? "yes" : "no",
        fears_phobias: bookingData.dog?.fears_phobias ? "yes" : "no",
        other_behavioral_issues: bookingData.dog?.other_behavioral_issues ? "yes" : "no",
        separation_anxiety: bookingData.dog?.separation_anxiety ? "yes" : "no",
      });

      setImagesPreview([bookingData.dog?.photo]);
    }
  }, [bookingData, bookingId, methods]);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <ToastContainer />
        {isError && <p className="text-red-600">{error.message}</p>}
        {isFetchError && <p className="text-red-600">{fetchError.message}</p>}
        {(isPending || isFetchingBooking) && <LoadingModal />}

        <h1 className="text-3xl font-bold text-white mb-4">
          {bookingId ? "Edit Booking" : "Booking Details"}
        </h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AddingBookingFormUi />

          {bookingData?.sessions?.length > 0 && (
            <div className="space-y-4 max-w-sm mt-4">
              <h2 className="text-xl font-bold">Sessions</h2>
              {bookingData.sessions.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow border"
                >
                  <span className="text-gray-700 dark:text-white">📅 {item.day}</span>
                  <span className="text-blue-600 dark:text-blue-400">🕒 {item.time}</span>
                </div>
              ))}
            </div>
          )}

          {imagesPreview.length > 0 && (
            <ImagesPreviewUi imagesPreviewUrls={imagesPreview} />
          )}
        </form>
      </div>
    </FormProvider>
  );
};

export default AddBookingForm;