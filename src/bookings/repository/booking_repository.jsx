import AxiosService from "../../common/service/axios_service";

class BookingRepository {
  constructor(getToken) {
    this.axiosService = new AxiosService(getToken); // Pass getToken to AxiosService
  }

  //Function to get Bookings
  async getBookings() {
    try {
      const response = await this.axiosService.get(
        "/api/getBookings",
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

  
  
  //Function to update  Booking
  async updateBooking(formData, bookingId) {
    try {
      const response = await this.axiosService.put(
        "/api/updateBooking/"+bookingId,
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
}

export default BookingRepository;
