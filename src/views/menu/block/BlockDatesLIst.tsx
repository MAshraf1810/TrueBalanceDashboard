import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react"; // Add this import if not already
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "../../components/shared/Skeleton";
import { useFetchBlockDates } from "../../hooks/block/useFetchBlockDates";
import apiClient from "../../services/api-client";

const BlockedList = () => {
  const { data, isLoading, isError, error, refetch } = useFetchBlockDates();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null); // Track currently deleting item

  const onDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await apiClient.post(`/api/dashboard/blockDays/${id}`, {
        _method: "DELETE",
      });
      toast.success("Blocked item deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["blockDates"] });
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Failed to delete blocked item.");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) return <Skeleton />;
  if (isError) {
    return (
      <div className="p-4 text-center text-error">
        <p>❌ Failed to load blocked dates.</p>
        <p className="text-sm mt-2">{(error as Error).message}</p>
        <button
          onClick={() => refetch()}
          className="btn btn-sm btn-outline mt-3"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl text-white font-bold mb-4">Blocked Dates</h1>
        <button
          onClick={() => navigate("/blocks-dates/add")}
          className="btn btn-primary mb-4"
        >
          Add New Day
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((item) => (
          <div
            key={item.id}
            className="card bg-base-100 shadow-md border border-base-200"
          >
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h2 className="card-title capitalize">{item.type}</h2>
                <button
                  onClick={() => onDelete(item.id)}
                  className={`btn btn-sm btn-error btn-outline ${
                    deletingId === item.id ? "loading" : ""
                  }`}
                  title="Delete"
                  disabled={deletingId === item.id}
                >
                  {deletingId === item.id ? "" : <FaTrash />}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {item.block_date ? (
                  <>
                    📅 Date:{" "}
                    <span className="font-medium">{item.block_date}</span>
                  </>
                ) : (
                  <>
                    📆 Day: <span className="font-medium">{item.day_name}</span>
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default BlockedList;
