import axios from "axios";

class DestinationRepository {
  constructor() {
    this.apiUrl = "http://139.59.25.108:9001";
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: { "Content-Type": "application/json" },
    });

    // Interceptor to add token to Authorization header
    this.axiosInstance.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add Bearer prefix if required
      }
      return config;
    });
  }

  async addDestination(formData) {
    try {
      const response = await this.axiosInstance.post("/user/login", formData);

      if (response.status === 200) {
        return {
          user: UserModel.fromJson(response.data.data),
          token: bearerToken,
        };
      } else {
        return {
          success: false,
          error: response.data.error || "Invalid email or password",
        };
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        return {
          success: false,
          error: error.response.data.error || "Invalid email or password",
        };
      } else if (error.request) {
        // No response received
        return { success: false, error: "Failed to connect to the server" };
      } else {
        // Other errors
        return { success: false, error: "An error occurred during login" };
      }
    }
  }
}

export default DestinationRepository;
