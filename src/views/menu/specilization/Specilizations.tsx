import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { showModal } from "../../components/modals/showModel";
import { closeModal } from "../../components/modals/closeModal";
import TableActions from "../../components/shared/TableActions";
import BlogsPagination from "../../ui/BlogsPagination";
import Modal from "../../components/modals/Modal";
import LoadingModal from "../../../modals/LoadingModal";
import { useFetchSpecilizations } from "../../hooks/specializations/useFetchSpecilizations";
import apiClient from "../../services/api-client";
import SpecializationsTable from "./SpecilizationsTable";

const Specilizations = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState<string>("1");
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ en: "", ar: "" });
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isError, error } = useFetchSpecilizations(currentPage);

  const handleEdit = (id: number) => {
    const spec = data?.data?.find((s: any) => s.id === id);
    if (spec) {
      setFormData({ en: spec.name.en, ar: spec.name.ar });
      setEditId(id);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    showModal("specialization_deletion_modal");
  };

  const handleAddOrEdit = async () => {
    try {
      setLoading(true);
      if (editId) {
        await apiClient.put(`/api/dashboard/specializations/${editId}`, {
          name: formData,
        });
        toast.success("Specialization updated!");
      } else {
        await apiClient.post(`/api/dashboard/specializations`, {
          name: formData,
        });
        toast.success("Specialization added!");
      }
      setIsModalOpen(false);
      setFormData({ en: "", ar: "" });
      setEditId(null);
      queryClient.invalidateQueries({ queryKey: ["specilizations"] });
    } catch (e) {
      toast.error("Failed to save specialization");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await apiClient.delete(`/api/dashboard/specializations/${deleteId}`);
      toast.success("Specialization deleted!");
      queryClient.invalidateQueries({ queryKey: ["specilizations"] });
    } catch (e) {
      toast.error("Failed to delete specialization.");
    } finally {
      closeModal("specialization_deletion_modal");
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {loading && <LoadingModal />}
      <ToastContainer />

      {/* Confirmation Modal */}
      <Modal
        modal_id="specialization_deletion_modal"
        onConfirm={confirmDelete}
        meta={{
          confirm: t("teams:teams.modal.confirm"),
          Cancel: t("teams:teams.modal.cancel"),
          label: t("teams:teams.modal.delete.message"),
        }}
      />

      {/* Top Actions */}
      <TableActions
        header="Specializations"
        add="Add Specialization"
        onAdd={() => {
          setFormData({ en: "", ar: "" });
          setEditId(null);
          setIsModalOpen(true);
        }}
      />

      {/* Table */}
      {!isLoading && !isError && (
        <SpecializationsTable
          headers={["ID", "Name (EN)", "Name (AR)"]}
          data={data?.data || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}
      {!isLoading && !isError && (
        <div className="mt-8 text-white">
          <BlogsPagination
            setCurrentPage={(page) => setCurrentPage(page)}
            blogs={data}
          />
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="skeleton h-32 w-full rounded-lg my-4"></div>
      )}

      {/* Error Alert */}
      {isError && (
        <div role="alert" className="alert alert-error">
          <span>Error: {error?.message}</span>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Specialization" : "Add Specialization"}
            </h2>

            <div className="mb-4">
              <label className="block font-semibold text-gray-700">
                Name (EN)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.en}
                onChange={(e) => setFormData({ ...formData, en: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-gray-700">
                Name (AR)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.ar}
                onChange={(e) => setFormData({ ...formData, ar: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEdit}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                disabled={loading}
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Specilizations;