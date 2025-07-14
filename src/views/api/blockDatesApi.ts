import apiClient from "../services/api-client";

export interface BlockedItem {
  id: number;
  type: string; // e.g., "date"
  day_name: string | null; // e.g., "Monday"
  block_date: string; // e.g., "2025-07-04"
  created_at: string; // e.g., "2025-05-25T11:11:25.000000Z"
  updated_at: string; // e.g., "2025-05-25T11:11:25.000000Z"
}

export const getBlockDates = async () => {
  const res = await apiClient.get<{ data: BlockedItem[] }>(
    "/api/dashboard/blockDays"
  );
  console.log("Block Dates=>", res.data.data);
  return res.data.data;
};
