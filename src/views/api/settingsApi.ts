import apiClient from "../services/api-client";

export interface FetchSettingsResponse {
  data: Settings[];
}

export interface FetchSettingResponse {
  data: Settings;
}

// Interface for the `title` object
interface Title {
  en: string;
  ar: string;
}

// Interface for the `address` object
interface Address {
  en: string;
  ar: string;
}

// Interface for the `phones` object
interface Phones {
  phones: string[];
  mobiles: string[];
}

// Interface for the `social_media` object
interface SocialMedia {
  linkedin: string;
  facebook: string;
  x: string;
  tiktok: string;
  instagram: string;
  YouTube: string;
}

export interface Settings {
  id: number;
  title: Title;
  email: string;
  address: Address;
  phones: Phones;
  social_media: SocialMedia;
  long: string;
  lat: string;
  created_at: string;
  updated_at: string;
}

const SETTINGS_API_ENDPOINT = "/api/dashboard/settings/list";
// API Functions
export const getSettings = async () => {
  const res = await apiClient.get<FetchSettingResponse>(SETTINGS_API_ENDPOINT);
  console.log("i'm here prof.", res.data.data);
  return res.data.data;
};

export const addSettingMutation = async ({
  formData,
}: {
  formData: FormData;
}) => {
  // Make a POST request to delete the project

  const res = await apiClient.post(`/api/dashboard/settings/update`, formData);
  console.log(res.data.data);
  return res.data.data;
};
