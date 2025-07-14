import { useState } from "react";
import { useFetchSpecilizations } from "../../hooks/specializations/useFetchSpecilizations";
import apiClient from "../../services/api-client";
import { useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";

const Specilizations = () => {
  const { data } = useFetchSpecilizations();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({ ar: "", en: "" });
  const [editServiceId, setEditServiceId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await apiClient.delete(`/api/dashboard/specializations/${id}`);
      queryClient.invalidateQueries({ queryKey: ["specilizations"] });
      toast.success("Specialization deleted successfully!");
    } catch (error) {
      console.error("Failed to delete service:", error);
      toast.error("Failed to delete specialization.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrEdit = async () => {
    try {
      setLoading(true);
      if (editServiceId) {
        // Editing existing service
        await apiClient.put(`/api/dashboard/specializations/${editServiceId}`, {
          name: newService,
        });
        toast.success("Specialization updated successfully!");
      } else {
        // Adding new service
        await apiClient.post("/api/dashboard/specializations", {
          name: newService,
        });
        toast.success("Specialization added successfully!");
      }

      queryClient.invalidateQueries({ queryKey: ["specilizations"] });
      setNewService({ ar: "", en: "" });
      setEditServiceId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add/edit specialization:", error);
      toast.error("Failed to add/edit specialization.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (service: {
    id: number;
    name: { ar: string; en: string };
  }) => {
    setEditServiceId(service.id);
    setNewService({ ar: service.name.ar, en: service.name.en });
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-6 text-white">
        Available Specilizations
      </h1>
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded-lg mb-4"
        onClick={() => {
          setNewService({ ar: "", en: "" });
          setEditServiceId(null);
          setIsModalOpen(true);
        }}
      >
        Add New Service
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center relative"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {service.name.en}
            </h2>
            <p className="text-sm text-gray-500">{service.name.ar}</p>
            <div className="absolute top-2 right-2 flex flex-col space-y-2">
              <button
                onClick={() => handleEditClick(service)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="bg-red-500 text-white py-1 px-3 rounded-lg"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editServiceId ? "Edit Service" : "Add New Service"}
            </h2>
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">
                Name (EN)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={newService.en}
                onChange={(e) =>
                  setNewService((prev) => ({ ...prev, en: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">
                Name (AR)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={newService.ar}
                onChange={(e) =>
                  setNewService((prev) => ({ ...prev, ar: e.target.value }))
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEdit}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                disabled={loading}
              >
                {loading
                  ? editServiceId
                    ? "Updating..."
                    : "Adding..."
                  : editServiceId
                  ? "Update"
                  : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Specilizations;
