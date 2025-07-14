import apiClient from "../services/api-client";

export interface FetchSpecializationResponse {
  data: specialization;
}
export interface FetchSpecializationsResponse {
  data: specialization[];
}
export interface specialization {
  id: number;
  name: {
    ar: string;
    en: string;
  };
}

const DOCTORS_API_ENDPOINT = "/api/dashboard/specializations";
// API Functions
export const getSpecializations = async () => {
  const res = await apiClient.get<FetchSpecializationsResponse>(
    `${DOCTORS_API_ENDPOINT}`
  );
  console.log("specializations", res.data.data);
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
  const res = await apiClient.get<FetchSpecializationsResponse>(
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
