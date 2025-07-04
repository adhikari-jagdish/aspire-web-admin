import axios from "axios";

class AxiosService {
  constructor(getToken = null, baseURL = "http://10.10.1.49:6001") {
    this.axiosInstance = axios.create({
      baseURL,
      //headers: { "Content-Type": "application/json" },
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

  // Convenience methods

  get(url, config = {}) {
    return this.axiosInstance.get(url, config);
  }

  post(url, data = {}, config = {}) {
    return this.axiosInstance.post(url, data, config);
  }

  put(url, data = {}, config = {}) {
    return this.axiosInstance.put(url, data, config);
  }

  delete(url, config = {}) {
    return this.axiosInstance.delete(url, config);
  }
}

export default AxiosService;
