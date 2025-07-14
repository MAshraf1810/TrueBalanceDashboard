import apiClient from "../services/api-client";
import { Meta, Pagination } from "../ui/Pagination";

export interface FetchTeamsResponse {
  data: {
    data: Booking[];
    links: Pagination;
    meta: Meta;
  };
}

export interface FetchTeamResponse {
  data: Booking;
}

export interface Session {
  day: string; // e.g., "2025-06-01"
  time: string; // e.g., "09:00"
}

export interface Dog {
  id: number;
  name: string;
  age: number;
  breed: string;
  gender: string;
  aggression: number;
  fears_phobias: number;
  destructive_behaviors: number;
  excessive_barking_whining: number;
  separation_anxiety: number;
  other_behavioral_issues: number;
  additional_info: string;
}

export interface Booking {
  id: number;
  user_name: string;
  user_location: string;
  user_email: string;
  user_phone: string;
  service: string;
  amount: number;
  total_session: number;
  first_session_date: string;
  booking_date: string;
  sessions: Session[];
  dog: Dog;
}

const Booking_API_ENDPOINT = "/api/dashboard/book/list";

// API Functions
export const getBooking = async (currentPage: string) => {
  const res = await apiClient.get<FetchTeamsResponse>(
    `${Booking_API_ENDPOINT}?page=${currentPage}`
  );
  console.log("blogs=>", res.data.data.data);
  return res.data.data;
};

export const addBlogMutation = async ({
  formData,
  blogId,
}: {
  formData: FormData;
  blogId?: string;
}) => {
  // Make a POST request to delete the project
  const POST_END_POINT = blogId
    ? `${Booking_API_ENDPOINT}/${blogId}`
    : Booking_API_ENDPOINT;

  const res = await apiClient.post(POST_END_POINT, formData);
  console.log(res.data.data);
  return res.data.data;
};

// API Functions
export const getBlog = async (blogId: string) => {
  console.log("any Body Here ?", blogId);
  const res = await apiClient.get<FetchTeamResponse>(
    `${Booking_API_ENDPOINT}/${blogId}`
  );
  console.log("Ashraf=> ", res.data.data);
  return res.data.data;
};

export const deleteBlogMutation = async (blogId: any) => {
  // Make a POST request to delete the project
  const res = await apiClient.post(`${Booking_API_ENDPOINT}/${blogId}`, {
    _method: "delete",
  });
  return res.data.data;
};
