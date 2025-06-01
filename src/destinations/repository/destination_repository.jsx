import AxiosService from "../../common/service/axios_service";

class DestinationRepository {
  constructor(getToken) {
    this.axiosService = new AxiosService(getToken); // Pass getToken to AxiosService
  }

  //Function to add a new destination
  async addDestination(formData) {
    try {
      const response = await this.axiosService.post(
        "/api/createDestination",
        formData
      );

      if (response.status === (201 || 200)) {
        return {
          data: response.data.data,
          message: response.data.message,
        };
      }
      throw new Error(response.data.message || "Oops! Something went wrong!");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      }
      throw new Error("Oops! Something went wrong!");
    }
  }

  //Function to get all destinations
  async getDestinations() {
    try {
      const response = await this.axiosService.get("/api/getDestinations");

      if (response.status === 200) {
        return {
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        // Server responded with a status other than 2xx
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      }
      throw new Error("Oops! Something went wrong!");
    }
  }

  //Function to get all destinations
  async deleteDestination(destinationId) {
    try {
      const response = await this.axiosService.delete(
        `/api/deleteDestination${destinationId}`
      );

      if (response.status === 200) {
        return {
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        // Server responded with a status other than 2xx
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      }
      throw new Error("Oops! Something went wrong!");
    }
  }
}

export default DestinationRepository;
