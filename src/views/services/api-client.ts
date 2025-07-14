import axios, { CanceledError } from "axios";

const apiClient = axios.create({
  baseURL: "https://truebalance.backend.tanfeethi.com.sa",
});

export { CanceledError };

// Attach token before request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("bruAuthToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRedirecting = false;

// Handle unauthorized responses & network issues
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("AXIOS ERROR:", error);

    // Remove token and redirect for both 401 and undefined responses
    const shouldLogout =
      !error.response || // Network issue (CORS, connection lost, etc.)
      error.response.status === 401; // Unauthorized response

    if (shouldLogout) {
      localStorage.removeItem("bruAuth");
      localStorage.removeItem("bruAuthToken");

      if (!isRedirecting && !window.location.pathname.includes("/login")) {
        isRedirecting = true;
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
