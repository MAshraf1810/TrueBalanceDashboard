import Modal from "../../components/modals/Modal";
import TableActions from "../../components/shared/TableActions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { showModal } from "../../components/modals/showModel";
import { useState } from "react";
import LoadingModal from "../../../modals/LoadingModal";
import { closeModal } from "../../components/modals/closeModal";
import { ToastContainer } from "react-toastify";
import DoctorsTable from "./DoctorsTable";
import { useFetchDoctors } from "../../hooks/doctors/useFetchDoctors";
import BlogsPagination from "../../ui/BlogsPagination";
import { useDeleteDoctor } from "../../hooks/doctors/useDeleteDoctor";

const Doctors = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<string>("1");

  const [teamId, setProjectId] = useState<number | null>(null);

  const { data, isLoading, error, isError } = useFetchDoctors(currentPage);

  // Define the columns : accessor is the key in the data object.
  const headers = ["Id", "Name", "Email", "Image", "phone", "specialization"];
  const handleProjectEditing = (id: number) => {
    navigate(`/doctors/add/${id}`);
  };
  const handleOpenDeletionModal = (id: number | null) => {
    if (id) setProjectId(id);
    showModal("service_deletion_model");
  };

  const {
    mutateAsync,
    isPending,
    isError: isDeleteMutationError,
    error: deleteMutationError,
  } = useDeleteDoctor();

  const handlingProjectDeletion = () => {
    if (teamId) {
      // Call the delete mutation
      mutateAsync(teamId);
    }

    // Close the modal
    closeModal("service_deletion_model");
  };

  if (isLoading)
    return (
      <div className="flex  flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-56"></div>
            <div className="skeleton h-4 w-64"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );

  if (isError)
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! {error.message}</span>
      </div>
    );

  return (
    <div className="p-6">
      {isDeleteMutationError && (
        <p className="error-message">{deleteMutationError.message}</p>
      )}
      {isPending && <LoadingModal />}
      <ToastContainer />
      <Modal
        modal_id="service_deletion_model"
        onConfirm={handlingProjectDeletion}
        meta={{
          confirm: `${t("teams:teams.modal.confirm")}`,
          Cancel: `${t("teams:teams.modal.cancel")}`,
          label: `${t("teams:teams.modal.delete.message")}`,
        }}
      />
      <TableActions
        header={"Doctors"}
        add={"Add Doctors"}
        onAdd={() => navigate("/doctors/add")}
      />
      {!isLoading && !isError && data?.data && (
        <DoctorsTable
          headers={headers}
          data={data.data}
          onEdit={handleProjectEditing}
          onDelete={handleOpenDeletionModal}
        />
      )}

      {!isLoading && !isError && (
        <div className="mt-8 text-white">
          <BlogsPagination
            setCurrentPage={(page) => setCurrentPage(page)}
            blogs={data}
          />
        </div>
      )}
    </div>
  );
};
export default Doctors;
