import apiClient from "../services/api-client";

export interface FetchClientsResponse {
  data: Clients[];
}

export interface FetchClientResponse {
  data: Clients;
}

export interface Clients {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  join_at: string;
  logo: string;
}

const CLIENTS_API_ENDPOINT = "/api/dashboard/clients";
// API Functions
export const getClients = async () => {
  const res = await apiClient.get<{ data: FetchClientsResponse }>(
    CLIENTS_API_ENDPOINT
  );
  return res.data.data.data;
};

// API Functions
export const getClient = async (clientId: string) => {
  console.log("any Body Here ?", clientId);
  const res = await apiClient.get<FetchClientResponse>(
    `${CLIENTS_API_ENDPOINT}/${clientId}`
  );
  console.log("coming from GET project by ID: ", res.data.data);
  return res.data.data;
};

export const addClientMutation = async ({
  formData,
  clientId,
}: {
  formData: FormData;
  clientId?: string;
}) => {
  // Make a POST request to delete the project
  const POST_END_POINT = clientId
    ? `${CLIENTS_API_ENDPOINT}/${clientId}`
    : CLIENTS_API_ENDPOINT;

  const res = await apiClient.post(POST_END_POINT, formData);
  console.log(res.data.data);
  return res.data.data;
};

export const deleteClientMutation = async (clientId: any) => {
  // Make a POST request to delete the project
  const res = await apiClient.post(`${CLIENTS_API_ENDPOINT}/${clientId}`, {
    _method: "delete",
  });
  return res.data.data;
};
