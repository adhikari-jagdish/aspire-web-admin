import AxiosService from "../../common/service/axios_service";

class TrekkingRepository {
  constructor(getToken) {
    this.AxiosService = new AxiosService(getToken); // Pass getToken to AxiosService
  }

  //Function to add a new tour package
  async createTrekkingPackage(formData) {
    try {
      const response = await this.AxiosService.post(
        "/api/createTrekkingPackage",
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

  //Function to get all tour packages
  async getTrekkingPackages() {
    try {
      const response = await this.AxiosService.get("/api/getTrekkingPackages");

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
  async getTrekkingPackageById(trekkingPackageId) {
    try {
      const response = await this.AxiosService.get("/api/getTrekkingPackageById/"+trekkingPackageId);

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
  async getTrekkingPackagesByDestinationId(destinationId) {
    try {
      const response = await this.AxiosService.get("/api/getTrekkingPackagesByDestinationId/"+destinationId);

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
  async getTrekkingPackagesByTravelThemeId(travelThemeId) {
    try {
      const response = await this.AxiosService.get("/api/getTrekkingPackagesByTravelThemeId/"+travelThemeId);

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
  async updateTrekkingPackage(formData, trekkingPackageId) {
    try {
      const response = await this.AxiosService.put("/api/updateTrekkingPackage/"+trekkingPackageId, formData);

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

     //Function to delete  tour package by  id
  async deleteTrekkingPackage(trekkingPackageId) {
    try {
      const response = await this.AxiosService.delete("/api/deleteTrekkingPackage/"+trekkingPackageId);

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

export default TrekkingRepository;