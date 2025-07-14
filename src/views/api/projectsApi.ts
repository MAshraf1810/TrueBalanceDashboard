import apiClient from "../services/api-client";

// GET Interfaces
export interface FetchProjectsResponse {
  data: Projects[];
}
export interface FetchProjectResponse {
  data: Projects;
}
export interface Projects {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  text: {
    ar: string;
    en: string;
  };
  type: "Commercial Area" | "Residential Area";
  address: {
    ar: string;
    en: string;
  };
  deliveredStatus: 0 | 1;
  images: { id: number; image: string }[];
}

// POST Interfaces
export interface AddProjectResponse {
  data: any;
  status: string;
  error: string;
  code: number;
}

// DELETE Interfaces
export interface DeleteProjectResponse {
  data: any;
  status: string;
  error: string;
  code: number;
}

// API Endpoints
const PROJECTS_API_ENDPOINT = "/api/dashboard/projects";

// API Functions
export const getProjects = async () => {
  const res = await apiClient.get<FetchProjectsResponse>(PROJECTS_API_ENDPOINT);
  return res.data.data;
};

// API Functions
export const getProject = async (projectId: string) => {
  console.log("any Body Here ?", projectId);
  const res = await apiClient.get<FetchProjectResponse>(
    `${PROJECTS_API_ENDPOINT}/${projectId}`
  );
  console.log("coming from GET project by ID: ", res.data.data);
  return res.data.data;
};

export const addProjectMutation = async ({
  formData,
  projectId,
}: {
  formData: FormData;
  projectId?: string;
}) => {
  // Make a POST request to delete the project
  const POST_END_POINT = projectId
    ? `${PROJECTS_API_ENDPOINT}/${projectId}`
    : PROJECTS_API_ENDPOINT;

  const res = await apiClient.post(POST_END_POINT, formData);
  console.log(res.data.data);
  return res.data.data;
};

export const deleteProjectMutation = async (projectId: any) => {
  // Make a POST request to delete the project
  const res = await apiClient.post(`${PROJECTS_API_ENDPOINT}/${projectId}`, {
    _method: "delete",
  });
  return res.data.data;
};

export const deleteProjectImage = async (imageId: number) => {
  // Make a POST request to delete the project
  const res = await apiClient.post(`/api/dashboard/projectImages/${imageId}`, {
    _method: "delete",
  });
  return res.data.data;
};
