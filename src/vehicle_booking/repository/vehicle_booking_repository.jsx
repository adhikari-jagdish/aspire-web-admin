import AxiosService from "../../common/service/axios_service";

class VehicleBookingRepository {
  constructor(getToken) {
    this.axiosService = new AxiosService(getToken);
  }

  // Create a vehicle booking
  async createVehicleBooking(payload) {
    try {
      const response = await this.axiosService.post(
        "/api/createVehicleBooking",
        payload
      );

      if (response.status >= 200 && response.status < 300) {
        return {
          data: response.data.data,
          message: response.data.message,
        };
      }

      throw new Error(
        response.data.message || "Failed to create vehicle booking"
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      } else {
        throw new Error("Oops! Something went wrong!");
      }
    }
  }

  // Get all vehicle bookings
  async getAllVehicleBookings() {
    try {
      const response = await this.axiosService.get("/api/getVehicleBookings");

      if (response.status === 200) {
        return {
          data: response.data.data,
          message: response.data.message,
        };
      }

      throw new Error("Failed to fetch vehicle bookings");
    } catch (error) {
      console.error(error);
      if (error.response) {
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      } else {
        throw new Error("Oops! Something went wrong!");
      }
    }
  }

  // Update a vehicle booking
  async updateVehicleBooking(payload, bookingId) {
    try {
      const response = await this.axiosService.put(
        `/api/updateVehicleBooking/${bookingId}`,
        payload
      );

      if (response.status >= 200 && response.status < 300) {
        return {
          data: response.data.data,
          message: response.data.message,
        };
      }

      throw new Error(
        response.data.message || "Failed to update vehicle booking"
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      } else {
        throw new Error("Oops! Something went wrong!");
      }
    }
  }

  // Delete a vehicle booking
  async deleteVehicleBooking(bookingId) {
    try {
      const response = await this.axiosService.delete(
        `/api/deleteVehicleBooking/${bookingId}`
      );

      if (response.status === 200) {
        return {
          data: response.data.data,
          message: response.data.message,
        };
      }

      throw new Error("Failed to delete vehicle booking");
    } catch (error) {
      console.error(error);
      if (error.response) {
        throw new Error(
          error.response.data.message || "Oops! Something went wrong!"
        );
      } else if (error.request) {
        throw new Error("Oops! Failed to connect to the server");
      } else {
        throw new Error("Oops! Something went wrong!");
      }
    }
  }
}

export default VehicleBookingRepository;
