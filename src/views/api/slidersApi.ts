import apiClient from "../services/api-client";

export interface FetchSlidersResponse {
  data: Sliders[];
}

export interface FetchSliderResponse {
  data: Sliders;
}

export interface Sliders {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  text: {
    ar: string;
    en: string;
  };
  btnTitle: {
    ar: string;
    en: string;
  };
  btnActive: string;
  background: string;
  btnUrl: string;
}

const SLIDERS_API_ENDPOINT = "/api/dashboard/sliders";
// API Functions
export const getSliders = async () => {
  const res = await apiClient.get<FetchSlidersResponse>(SLIDERS_API_ENDPOINT);
  return res.data.data;
};

export const deleteSliderMutation = async (sliderId: any) => {
  // Make a POST request to delete the project
  const res = await apiClient.post(`${SLIDERS_API_ENDPOINT}/${sliderId}`, {
    _method: "delete",
  });
  return res.data.data;
};

export const addSliderMutation = async ({
  formData,
  sliderId,
}: {
  formData: FormData;
  sliderId?: string;
}) => {
  // Make a POST request to delete the project
  const POST_END_POINT = sliderId
    ? `${SLIDERS_API_ENDPOINT}/${sliderId}`
    : SLIDERS_API_ENDPOINT;

  const res = await apiClient.post(POST_END_POINT, formData);
  console.log(res.data.data);
  return res.data.data;
};

// API Functions
export const getSlider = async (sliderId: string) => {
  console.log("any Body Here ?", sliderId);
  const res = await apiClient.get<FetchSliderResponse>(
    `${SLIDERS_API_ENDPOINT}/${sliderId}`
  );
  console.log("coming from GET Team by ID: ", res.data.data);
  return res.data.data;
};
