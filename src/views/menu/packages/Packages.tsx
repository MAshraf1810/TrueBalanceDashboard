import Modal from "../../components/modals/Modal";
import TableActions from "../../components/shared/TableActions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { showModal } from "../../components/modals/showModel";
import { useState } from "react";
import LoadingModal from "../../../modals/LoadingModal";
import { closeModal } from "../../components/modals/closeModal";
import { ToastContainer } from "react-toastify";
import PackagesTable from "./PackagesTable";
import { useFetchPackages } from "../../hooks/packages/useFetchPakages";
import { useDeletePackageMutation } from "../../hooks/packages/useDeletePackageMutation";
import { FaInfoCircle, FaCheckCircle } from "react-icons/fa";

const Packages = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [packageId, setPackageId] = useState<number | null>(null);

  const { data, isLoading, error, isError } = useFetchPackages();

  // Define the columns : accessor is the key in the data object.
  const headers = ["ID", "Title", "Price", "Feature"];

  const handleProjectEditing = (id: number) => {
    navigate(`/packages/add/${id}`);
  };
  const handleOpenDeletionModal = (id: number | null) => {
    if (id) setPackageId(id);
    showModal("package_deletion_model");
  };
  const handleOpenFeatureModal = (id: number | null) => {
    if (id) setPackageId(id);
    showModal("package_feature_model");
  };

  const {
    mutateAsync,
    isPending,
    isError: isDeleteMutationError,
    error: deleteMutationError,
  } = useDeletePackageMutation();

  const handlingProjectDeletion = () => {
    if (packageId) {
      // Call the delete mutation
      mutateAsync(packageId);
    }

    // Close the modal
    closeModal("package_deletion_model");
  };

  // const handlingShowFeature = () => {
  //   // Close the modal
  //   closeModal("package_feature_model");
  // };

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
        modal_id="package_deletion_model"
        onConfirm={handlingProjectDeletion}
        meta={{
          confirm: `${t("projects:projects.modal.confirm")}`,
          Cancel: `${t("projects:projects.modal.cancel")}`,
          label: `${t("projects:projects.modal.delete.message")}`,
        }}
      />
      <dialog
        id={"package_feature_model"}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <p className="py-4 text-xl font-serif font-bold ">Package Features</p>
          <div className="modal-action  flex flex-wrap gap-2 justify-start ">
            {data
              ?.filter((pkg) => pkg.id === packageId)[0]
              ?.features?.map((feature, featureIndex) => (
                <div
                  key={`${featureIndex}`}
                  className="card shadow-md bg-base-100 border border-base-300"
                >
                  <div className="card-body space-y-4 min-w-[425px]">
                    <div className="flex items-center gap-3">
                      <FaInfoCircle className="text-primary" />
                      <h2 className="font-semibold text-base-content">
                        Feature Title:
                      </h2>
                      <p className="text-base-content">{feature.title.en}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="text-success" />
                      <h2 className="font-semibold text-base-content">
                        Checked Status:
                      </h2>
                      <p className="text-base-content">
                        {feature.checkedStatus}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <form method="dialog" className="mt-4">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Cancel</button>
          </form>
        </div>
      </dialog>
      <TableActions
        header={"Packages"}
        add={t("add Package")}
        onAdd={() => navigate("/packages/add")}
      />
      {!isLoading && !isError && (
        <PackagesTable
          headers={headers}
          data={data!}
          lang="ar"
          onEdit={handleProjectEditing}
          onDelete={handleOpenDeletionModal}
          onShowFeature={(id) => {
            setPackageId(id);
            handleOpenFeatureModal(id);
          }}
        />
      )}
    </div>
  );
};
export default Packages;
