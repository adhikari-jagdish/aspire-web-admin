import axios from "axios";

class AuthAxiosService {
  constructor(
    getToken = null,
    baseURL = process.env.REACT_APP_API_URL || "http://139.59.25.108:9001"
  ) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
    });

    this.getToken = getToken;

    // Request interceptor to add token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.getToken) {
          const token = this.getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for handling 401 errors
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && !error.config.skipRedirect) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // Getter for the axios instance
  get instance() {
    return this.axiosInstance;
  }
}

export default AuthAxiosService;
