import apiClient from "../services/api-client";

export interface FetchPagesResponse {
  data: Pages[];
}

export interface FetchPageResponse {
  data: Pages;
}

export interface Pages {
  id: number;
  name: string;
  title: {
    ar: string;
    en: string;
  };
  text: {
    ar: string;
    en: string;
  };
  image: string;
}

const PAGES_API_ENDPOINT = "/api/dashboard/staticPages";

// API Functions
export const getPages = async () => {
  const res = await apiClient.get<FetchPagesResponse>(PAGES_API_ENDPOINT);
  console.log(res.data.data);
  return res.data.data;
};

export const addPageMutation = async ({ formData }: { formData: FormData }) => {
  // Make a POST request to delete the project
  const POST_END_POINT = "/api/dashboard/update/staticPages";

  const res = await apiClient.post(POST_END_POINT, formData);
  console.log(res.data.data);
  return res.data.data;
};
