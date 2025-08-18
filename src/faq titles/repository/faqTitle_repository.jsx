import AxiosService from "../../common/service/axios_service";

class FaqTitleRepository {
  constructor(getToken) {
    this.axiosService = new AxiosService(getToken); // Pass getToken to AxiosService
  }

  //Function to add a new FaqTitle
  async addFaqTitle(formData) {
    try {
      const response = await this.axiosService.post(
        "/api/createFaqTitle",
        formData
      );

      if (response.status >= 200 || response.status <  300) {
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

  
  //Function to update  FaqTitle
  async updateFaqTitle(formData, faqTitleId) {
    try {
      const response = await this.axiosService.put(
        "/api/updateFaqTitle/"+faqTitleId,
        formData
      );
      if (response.status >= 200 || response.status <  300) {
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
      console.log(error)
      throw new Error("Oops! Something went wrong!");
    }
  }

  //Function to get all FaqTitles
  async getFaqTitles() {
    try {
      const response = await this.axiosService.get("/api/getFaqTitles");
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

  //Function to get all FaqTitles
  async deleteFaqTitle(faqTitleId) {
    try {
      const response = await this.axiosService.delete(
        `/api/deleteFaqTitle/${faqTitleId}`
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

export default FaqTitleRepository;
