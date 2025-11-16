import AxiosService from "../service/axios_service";

class PackageRepository {
  constructor(getToken) {
    this.AxiosService = new AxiosService(getToken); // Pass getToken to AxiosService
  }

  //Function to add a package
  async createPackage(formData) {
    try {
      const response = await this.AxiosService.post(
        "/api/createPackage",
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
  async getPackages() {
    try {
      const response = await this.AxiosService.get("/api/getPackages");

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

    async getPackagesByType(packageType) {
    try {
      const response = await this.AxiosService.get(`/api/getPackagesByType?packageType=${packageType}`);

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

   //Function to get  package by id
  async getPackageById(packageId) {
    try {
      const response = await this.AxiosService.get("/api/getPackageById/"+packageId);

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
  async getPackagesByDestinationId(destinationId) {
    try {
      const response = await this.AxiosService.get("/api/getPackagesByDestinationId/"+destinationId);

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
  async getPackagesByTravelThemeId(travelThemeId) {
    try {
      const response = await this.AxiosService.get("/api/getPackagesByTravelThemeId/"+travelThemeId);

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

  async updatePackage(formData, packageId) {
    try {
      const response = await this.AxiosService.put("/api/updatePackage/"+packageId, formData);

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
  async deletePackage(packageId) {
    try {
      const response = await this.AxiosService.delete("/api/deletePackage/"+packageId);

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

export default PackageRepository;