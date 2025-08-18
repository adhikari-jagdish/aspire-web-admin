import AxiosService from "../../common/service/axios_service";

class ReviewRepository {
  constructor(getToken) {
    this.axiosService = new AxiosService(getToken); // Pass getToken to AxiosService
  }

  // Function to add a new review
  async addReview(formData) {
    try {
      const response = await this.axiosService.post(
        "/api/createReview",
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

  // Function to update a review
  async updateReview(formData, reviewId) {
    try {
      const response = await this.axiosService.put(
        `/api/updateReview/${reviewId}`,
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
        // Server responded with a status other than 2xx
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      }
      console.log(error);
      throw new Error("Oops! Something went wrong!");
    }
  }

  //Function to get all reviews
  async getAllReviews() {
    try {
      const response = await this.axiosService.get("/api/getAllReviews");
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

  // Function to delete a review
  async deleteReview(reviewId) {
    try {
      const response = await this.axiosService.delete(
        `/api/deleteReview/${reviewId}`
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

export default ReviewRepository;
