import React, { useState } from "react";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AddBlockedForm = () => {
  const [type, setType] = useState<"date" | "day">("date");
  const [blockDate, setBlockDate] = useState("");
  const [dayName, setDayName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload =
      type === "date"
        ? { type, block_date: blockDate }
        : { type, day_name: dayName };

    try {
      await apiClient.post("/api/dashboard/blockDays", payload); // Adjust endpoint as needed
      setBlockDate("");
      setDayName("");
      toast.success("Add blocked item successfully!");
      setTimeout(() => {
        navigate("/blocks-dates");
      }, 1000);
    } catch (error) {
      console.error("Failed to add blocked item:", error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md border border-base-200 p-6 max-w-md mx-auto mb-6">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="form-control gap-4">
        <h2 className="text-xl font-bold">Add Blocked Day/Date</h2>

        <label className="label">
          <span className="label-text">Type</span>
        </label>
        <select
          className="select select-bordered"
          value={type}
          onChange={(e) => setType(e.target.value as "date" | "day")}
        >
          <option value="date">Date</option>
          <option value="day">Day of Week</option>
        </select>

        {type === "date" ? (
          <>
            <label className="label">
              <span className="label-text">Block Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered"
              value={blockDate}
              onChange={(e) => setBlockDate(e.target.value)}
              required
            />
          </>
        ) : (
          <>
            <label className="label">
              <span className="label-text">Day of Week</span>
            </label>
            <select
              className="select select-bordered"
              value={dayName}
              onChange={(e) => setDayName(e.target.value)}
              required
            >
              <option value="">Select a day</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </>
        )}

        <button type="submit" className="btn btn-primary mt-4">
          Add Block
        </button>
      </form>
    </div>
  );
};

export default AddBlockedForm;
