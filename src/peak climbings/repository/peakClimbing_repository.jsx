import AxiosService from "../../common/service/axios_service";

class PeakClimbingRepository {
  constructor(getToken) {
    this.AxiosService = new AxiosService(getToken); // Pass getToken to AxiosService
  }

  //Function to add a new tour package
  async createPeakClimbingPackage(formData) {
    try {
      const response = await this.AxiosService.post(
        "/api/createPeakClimbingPackage",
        formData
      );

      if (response.status >= 200 || response.status < 300) {
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

  //Function to get all peak climbing packages
  async getPeakClimbingPackages() {
    try {
      const response = await this.AxiosService.get("/api/getPeakClimbingPackages");

      if (response.status >= 200 || response.status < 300) {
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

   //Function to get  tour package by id
  async getPeakClimbingPackageById(peakClimbingPackageId) {
    try {
      const response = await this.AxiosService.get("/api/getPeakClimbingPackageById/"+peakClimbingPackageId);

      if (response.status >= 200 || response.status < 300) {
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

   //Function to get  tour package by destination id
  async getPeakClimbingPackagesByDestinationId(destinationId) {
    try {
      const response = await this.AxiosService.get("/api/getPeakClimbingPackagesByDestinationId/"+destinationId);

      if (response.status >= 200 || response.status < 300) {
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

   //Function to get  tour package by travelTheme id
  async getPeakClimbingPackagesByTravelThemeId(travelThemeId) {
    try {
      const response = await this.AxiosService.get("/api/getPeakClimbingPackagesByTravelThemeId/"+travelThemeId);

      if (response.status >= 200 || response.status < 300) {
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

  async updatePeakClimbingPackage(formData, peakClimbingPackageId) {
    try {
      const response = await this.AxiosService.put("/api/updatePeakClimbingPackage/"+peakClimbingPackageId, formData);

      if (response.status >= 200 || response.status < 300) {
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

     //Function to delete  peak climbing package by  id
  async deletePeakClimbingPackage(peakClimbingPackageId) {
    try {
      const response = await this.AxiosService.delete("/api/deletePeakClimbingPackage/"+peakClimbingPackageId);

      if (response.status >= 200 || response.status < 300) {
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
  
}

export default PeakClimbingRepository;