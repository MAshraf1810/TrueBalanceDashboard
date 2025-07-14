import apiClient from "../services/api-client";

// GET Interfaces
export interface FetchPackagesResponse {
  data: Packages[];
}
export interface FetchPackageResponse {
  data: Packages;
}
interface Title {
  ar: string;
  en: string;
}

interface Feature {
  id: number;
  title: Title;
  checkedStatus: number;
}

export interface Packages {
  id: number;
  title: Title;
  price: number;
  activeStatus: number;
  features: Feature[];
}

// POST Interfaces => CONST
export interface AddProjectResponse {
  data: any;
  status: string;
  error: string;
  code: number;
}

// DELETE Interfaces  => CONST
export interface DeleteProjectResponse {
  data: any;
  status: string;
  error: string;
  code: number;
}

// API Endpoints
const PACKAGES_API_ENDPOINT = "/api/dashboard/packages";

// API Functions
export const getPackages = async () => {
  const res = await apiClient.get<FetchPackagesResponse>(PACKAGES_API_ENDPOINT);
  console.log("Packages", res.data.data);
  return res.data.data;
};

// API Functions
export const getPackage = async (packageId: string) => {
  console.log("any Body Here ?", packageId);
  const res = await apiClient.get<FetchPackageResponse>(
    `${PACKAGES_API_ENDPOINT}/${packageId}`
  );
  console.log("coming from GET package by ID: ", res.data.data);
  return res.data.data;
};

export const addPackagesMutation = async ({
  formData,
  packageId,
}: {
  formData: FormData;
  packageId?: string;
}) => {
  // Make a POST request to delete the project
  const POST_END_POINT = packageId
    ? `${PACKAGES_API_ENDPOINT}/${packageId}`
    : PACKAGES_API_ENDPOINT;

  const res = await apiClient.post(POST_END_POINT, formData);
  console.log("packages=>", res.data.data);
  return res.data.data;
};

export const deletePackageMutation = async (packageId: any) => {
  // Make a POST request to delete the project
  const res = await apiClient.post(`${PACKAGES_API_ENDPOINT}/${packageId}`, {
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
