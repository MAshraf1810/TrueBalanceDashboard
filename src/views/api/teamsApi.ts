import apiClient from "../services/api-client";

export interface FetchTeamsResponse {
  data: Teams[];
}

export interface FetchTeamResponse {
  data: Teams;
}

export interface Teams {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  position: {
    ar: string;
    en: string;
  };
  image: string;
}

const TEAMS_API_ENDPOINT = "/api/dashboard/teams";

// API Functions
export const getTeams = async () => {
  const res = await apiClient.get<FetchTeamsResponse>(TEAMS_API_ENDPOINT);
  return res.data.data;
};

export const addTeamMutation = async ({
  formData,
  projectId,
}: {
  formData: FormData;
  projectId?: string;
}) => {
  // Make a POST request to delete the project
  const POST_END_POINT = projectId
    ? `${TEAMS_API_ENDPOINT}/${projectId}`
    : TEAMS_API_ENDPOINT;

  const res = await apiClient.post(POST_END_POINT, formData);
  console.log(res.data.data);
  return res.data.data;
};

// API Functions
export const getTeam = async (teamId: string) => {
  console.log("any Body Here ?", teamId);
  const res = await apiClient.get<FetchTeamResponse>(
    `${TEAMS_API_ENDPOINT}/${teamId}`
  );
  console.log("coming from GET Team by ID: ", res.data.data);
  return res.data.data;
};

export const deleteTeamMutation = async (teamId: any) => {
  // Make a POST request to delete the project
  const res = await apiClient.post(`${TEAMS_API_ENDPOINT}/${teamId}`, {
    _method: "delete",
  });
  return res.data.data;
};
