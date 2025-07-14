import Modal from "../../components/modals/Modal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProjectsTable from "./ProjectsTable";
import { showModal } from "../../components/modals/showModel";
import { useEffect, useState } from "react";
import { useDeleteProjectMutation } from "../../hooks/projects/useDeleteProjectMutation";
import LoadingModal from "../../../modals/LoadingModal";
import { closeModal } from "../../components/modals/closeModal";
import { ToastContainer } from "react-toastify";
import apiClient from "../../services/api-client";
import Statics from "../../components/one-time/Statics";
export interface Statics {
  total_users_count: number;
  total_booking_count: number;
  new_users_count: number;
  new_booking_count: number;
  new_booking: {
    id: number;
    user_name: string;
    service: string;
    amount: number;
    total_session: number;
    first_session_date: string;
    booking_date: string;
  }[];
}
const Projects = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [projectId, setProjectId] = useState<number | null>(null);
  const [statics, setStatics] = useState<Statics>({} as Statics);

  useEffect(() => {
    const fetchStatics = async () => {
      const response = await apiClient<{ data: Statics }>(
        "/api/dashboard/auth/statistics"
      );
      const data = await response.data.data;
      console.log("Statics=>", data);
      setStatics(data);
    };
    fetchStatics();
  }, []);

  // Define the columns : accessor is the key in the data object.
  const headers = [
    "id",
    "user_name",
    "service",
    "amount",
    "total_session",
    "first_session_date",
    "booking_date",
  ];

  const handleProjectEditing = (id: number) => {
    navigate(`/projects/add/${id}`);
  };
  const handleOpenDeletionModal = (id: number | null) => {
    if (id) setProjectId(id);
    showModal("project_deletion_model");
  };

  const {
    mutateAsync,
    isPending,
    isError: isDeleteMutationError,
    error: deleteMutationError,
  } = useDeleteProjectMutation();
  const isLoading = false;
  const isError = false;
  const error = { message: "" };

  const handlingProjectDeletion = () => {
    if (projectId) {
      // Call the delete mutation
      mutateAsync(projectId);
    }

    // Close the modal
    closeModal("project_deletion_model");
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
        modal_id="project_deletion_model"
        onConfirm={handlingProjectDeletion}
        meta={{
          confirm: `${t("projects:projects.modal.confirm")}`,
          Cancel: `${t("projects:projects.modal.cancel")}`,
          label: `${t("projects:projects.modal.delete.message")}`,
        }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 p-4 mb-2">
        {statics &&
          (() => {
            const headers = [
              "Total Users",
              "Total Bookings",
              "Total new Users",
              "Total New Booking",
            ];
            const staticData = [
              statics.total_users_count,
              statics.total_booking_count,
              statics.new_users_count,
              statics.new_booking_count,
            ];

            return staticData.map((item, idx) => (
              <Statics key={idx} header={headers[idx]} statics={item} />
            ));
          })()}
      </div>
      {!isLoading && !isError && (
        <ProjectsTable
          headers={headers}
          data={statics.new_booking!}
          lang="ar"
          onEdit={handleProjectEditing}
          onDelete={handleOpenDeletionModal}
        />
      )}
    </div>
  );
};
export default Projects;
