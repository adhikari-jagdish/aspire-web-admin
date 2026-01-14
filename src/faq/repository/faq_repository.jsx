import AxiosService from "../../common/service/axios_service";

class FaqRepository {
  constructor(getToken) {
    this.axiosService = new AxiosService(getToken); // Pass getToken to AxiosService
  }

  // Function to create a new FAQ Title
  async createFaqTitle(formData) {
    try {
      const response = await this.axiosService.post(
        "/api/createFaqTitle",
        formData
      );

      if (response.status >= 200 && response.status < 300) {
        return {
          data: response.data.data,
          message: response.data.message,
        };
      }
      throw new Error(response.data.message || "Oops! Something went wrong!");
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      }
      throw new Error("Oops! Something went wrong!");
    }
  }

  // Function to update an FAQ Title
  async updateFaqTitle(formData, faqTitleId) {
    try {
      const response = await this.axiosService.put(
        "/api/updateFaqTitle/" + faqTitleId,
        formData
      );
      if (response.status >= 200 && response.status < 300) {
        return {
          data: response.data.data,
          message: response.data.message,
        };
      }
      throw new Error(response.data.message || "Oops! Something went wrong!");
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      }
      throw new Error("Oops! Something went wrong!");
    }
  }

  // Function to get all FAQ Titles
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
      if (error.response) {
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      }
      throw new Error("Oops! Something went wrong!");
    }
  }

  // Function to delete an FAQ Title
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
      if (error.response) {
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      }
      throw new Error("Oops! Something went wrong!");
    }
  }

  // Function to create a new FAQ
  async createFaq(formData) {
    try {
      const response = await this.axiosService.post("/api/createFaq", formData);

      if (response.status >= 200 && response.status < 300) {
        return {
          data: response.data.data,
          message: response.data.message,
        };
      }
      throw new Error(response.data.message || "Oops! Something went wrong!");
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      }
      throw new Error("Oops! Something went wrong!");
    }
  }

  // Function to get all FAQs by Title
  async getAllFaqsByTitle(faqTitle) {
    try {
      const response = await this.axiosService.get(
        `/api/getAllFaqsByTitle/${faqTitle}`
      );
      if (response.status === 200) {
        return {
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      }
      throw new Error("Oops! Something went wrong!");
    }
  }

  // Function to update an FAQ
  async updateFaq(formData, faqId) {
    try {
      const response = await this.axiosService.put(
        "/api/updateFaq/" + faqId,
        formData
      );
      if (response.status >= 200 && response.status < 300) {
        return {
          data: response.data.data,
          message: response.data.message,
        };
      }
      throw new Error(response.data.message || "Oops! Something went wrong!");
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      }
      throw new Error("Oops! Something went wrong!");
    }
  }

  // Function to delete an FAQ
  async deleteFaq(faqId) {
    try {
      const response = await this.axiosService.delete(
        `/api/deleteFaq/${faqId}`
      );

      if (response.status === 200) {
        return {
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      if (error.response) {
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

export default FaqRepository;
