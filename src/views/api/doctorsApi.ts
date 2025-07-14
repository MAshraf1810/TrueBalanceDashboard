import apiClient from "../services/api-client";
import { Meta, Pagination } from "../ui/Pagination";

export interface FetchServiceResponse {
  data: Doctors;
}
export interface FetchDoctorsResponse {
  data: {
    data: Doctors[];
    links: Pagination;
    meta: Meta;
  };
}
export interface Doctors {
  id: number;
  name: string;
  email: string;
  image: string;
  phone: string;
  specialization: string;
}

const DOCTORS_API_ENDPOINT = "/api/dashboard/doctors";
// API Functions
export const getDoctors = async (currentPage: string) => {
  const res = await apiClient.get<FetchDoctorsResponse>(
    `${DOCTORS_API_ENDPOINT}?page=${currentPage}`
  );
  console.log("Doctoers", res.data.data);
  return res.data.data;
};

export const addDoctorMutation = async ({
  formData,
  serviceId,
}: {
  formData: FormData;
  serviceId?: string;
}) => {
  // Make a POST request to delete the project

  const POST_END_POINT = serviceId
    ? `${DOCTORS_API_ENDPOINT}/${serviceId}`
    : DOCTORS_API_ENDPOINT;

  console.log("Tas=>", POST_END_POINT);
  const res = await apiClient.post(POST_END_POINT, formData);
  console.log(res.data.data);
  return res.data.data;
};

// API Functions
export const getDoctor = async (doctorId: string) => {
  console.log("any Body Here ?", doctorId);
  const res = await apiClient.get<FetchServiceResponse>(
    `${DOCTORS_API_ENDPOINT}/${doctorId}`
  );
  console.log("coming from GET Team by ID: ", res.data.data);
  return res.data.data;
};

export const deleteDoctorMutation = async (teamId: any) => {
  // Make a POST request to delete the project
  const res = await apiClient.post(`${DOCTORS_API_ENDPOINT}/${teamId}`, {
    _method: "delete",
  });
  return res.data.data;
};
