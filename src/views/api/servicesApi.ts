import apiClient from "../services/api-client";

export interface FetchServicesResponse {
  data: Services[];
}

export interface FetchServiceResponse {
  data: Services;
}

export interface Services {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  text: {
    ar: string;
    en: string;
  };
  icon: string;
}

const SERVICES_API_ENDPOINT = "/api/dashboard/services";
// API Functions
export const getServices = async () => {
  const res = await apiClient.get<FetchServicesResponse>(SERVICES_API_ENDPOINT);
  return res.data.data;
};

export const addServiceMutation = async ({
  formData,
  serviceId,
}: {
  formData: FormData;
  serviceId?: string;
}) => {
  // Make a POST request to delete the project

  const POST_END_POINT = serviceId
    ? `${SERVICES_API_ENDPOINT}/${serviceId}`
    : SERVICES_API_ENDPOINT;

  console.log("Tas=>",POST_END_POINT);
  const res = await apiClient.post(POST_END_POINT, formData);
  console.log(res.data.data);
  return res.data.data;
};

// API Functions
export const getService = async (serviceId: string) => {
  console.log("any Body Here ?", serviceId);
  const res = await apiClient.get<FetchServiceResponse>(
    `${SERVICES_API_ENDPOINT}/${serviceId}`
  );
  console.log("coming from GET Team by ID: ", res.data.data);
  return res.data.data;
};

export const deleteServiceMutation = async (teamId: any) => {
  // Make a POST request to delete the project
  const res = await apiClient.post(`${SERVICES_API_ENDPOINT}/${teamId}`, {
    _method: "delete",
  });
  return res.data.data;
};
