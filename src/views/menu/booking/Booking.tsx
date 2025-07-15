import Modal from "../../components/modals/Modal";
import TableActions from "../../components/shared/TableActions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { showModal } from "../../components/modals/showModel";
import { useState } from "react";
import LoadingModal from "../../../modals/LoadingModal";
import { closeModal } from "../../components/modals/closeModal";
import { ToastContainer } from "react-toastify";
import { useFetchBooking } from "../../hooks/booking/useFetchBooking";
import BookingTable from "./BookingTable";
import { useDeleteBookingMutation } from "../../hooks/booking/useDeleteBookingMutation";
import BlogsPagination from "../../ui/BlogsPagination";

const Booking = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<string>("1");
  const [bookingId, setBookingId] = useState<number | null>(null);

  const { data, isLoading, error, isError } = useFetchBooking(currentPage);

  const headers = [
    "User Name",
    "Service Name",
    "Session Date",
    "Payment Date",
    "Total Payment",
    "Total Sessions",
  ];

  const handleBookingView = (id: number) => {
    navigate(`/bookings/view/${id}`);
  };

  const handleOpenDeleteModal = (id: number) => {
    setBookingId(id);
    showModal("booking_deletion_modal");
  };

  const {
    mutateAsync,
    isPending,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteBookingMutation();

  const handleDeleteBooking = () => {
    if (bookingId) mutateAsync(bookingId);
    closeModal("booking_deletion_modal");
  };

  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 rounded-full" />
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-56" />
            <div className="skeleton h-4 w-64" />
          </div>
        </div>
        <div className="skeleton h-32 w-full" />
      </div>
    );

  if (isError)
    return (
      <div role="alert" className="alert alert-error">
        <span>Error! {error.message}</span>
      </div>
    );

  return (
    <div className="p-6">
      {isDeleteError && <p className="text-red-600">{deleteError.message}</p>}
      {isPending && <LoadingModal />}
      <ToastContainer />

      <Modal
        modal_id="booking_deletion_modal"
        onConfirm={handleDeleteBooking}
        meta={{
          confirm: t("teams:teams.modal.confirm"),
          Cancel: t("teams:teams.modal.cancel"),
          label: t("teams:teams.modal.delete.message"),
        }}
      />

      <TableActions
        header="Booking Data"
        add=""
        onAdd={() => navigate("/bookings/add")}
      />

      <BookingTable
        headers={headers}
        data={data?.data || []}
        lang="en"
        onView={handleBookingView}
        onDelete={handleOpenDeleteModal}
      />

      <BlogsPagination
        setCurrentPage={setCurrentPage}
        blogs={data}
      />
    </div>
  );
};

export default Booking;