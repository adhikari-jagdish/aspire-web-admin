import AxiosService from "../../common/service/axios_service";

class DestinationRepository {
  constructor(getToken) {
    this.axiosService = new AxiosService(getToken); // Pass getToken to AxiosService
  }
  async addDestination(formData) {
    try {
      const response = await this.axiosService.post(
        "/api/createDestination",
        formData
      );

      if (response.status === 200) {
        return {
          destination: DestinationModel.fromJson(response.data.data),
          token: bearerToken,
        };
      }
      throw new Error(response.data.error || "Oops! Something went wrong!");
    } catch (error) {
      console.log(error);
      if (error.response) {
        // Server responded with a status other than 2xx
        throw new Error(
          error.response.data.error || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Failed to connect to the server");
      }
      throw new Error("An error occurred during login");
    }
  }
}

export default DestinationRepository;
