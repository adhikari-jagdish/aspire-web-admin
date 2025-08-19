import AxiosService from "../../common/service/axios_service";

class TopRatedPackageRepository {
  constructor(getToken) {
    this.AxiosService = new AxiosService(getToken); // Pass getToken to AxiosService
  }

  //Function to add a new TopRatedPackage package
  async createTopRatedPackage(packageId) {
    try {
      const response = await this.AxiosService.post(
        "/api/createTopRatedPackages",
        {packageId}
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

  //Function to get all TopRatedPackage packages
  async getAllTopRatedPackages() {
    try {
      const response = await this.AxiosService.get("/api/getAllTopRatedPackages");

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

  // //Function to get  TopRatedPackage package by id
  // async getTopRatedPackagePackageById(TopRatedPackagePackageId) {
  //   try {
  //     const response = await this.AxiosService.get(
  //       "/api/getTopRatedPackagePackageById/" + TopRatedPackagePackageId
  //     );

  //     if (response.status >= 200 || response.status < 300) {
  //       return {
  //         data: response.data.data,
  //         message: response.data.message,
  //       };
  //     }
  //     throw new Error(response.data.message || "Oops! Something went wrong!");
  //   } catch (error) {
  //     if (error.response) {
  //       // Server responded with a status other than 2xx
  //       throw new Error(
  //         error.response.data.message || "Oops! Something went wrong!"
  //       );
  //     } else if (error.request) {
  //       throw new Error("Oops! Failed to connect to the server");
  //     }
  //     throw new Error("Oops! Something went wrong!");
  //   }
  // }

  // //Function to get  TopRatedPackage package by destination id
  // async getTopRatedPackagePackagesByDestinationId(destinationId) {
  //   try {
  //     const response = await this.AxiosService.get(
  //       "/api/getTopRatedPackagePackagesByDestinationId/" + destinationId
  //     );

  //     if (response.status >= 200 || response.status < 300) {
  //       return {
  //         data: response.data.data,
  //         message: response.data.message,
  //       };
  //     }
  //     throw new Error(response.data.message || "Oops! Something went wrong!");
  //   } catch (error) {
  //     if (error.response) {
  //       // Server responded with a status other than 2xx
  //       throw new Error(
  //         error.response.data.message || "Oops! Something went wrong!"
  //       );
  //     } else if (error.request) {
  //       throw new Error("Oops! Failed to connect to the server");
  //     }
  //     throw new Error("Oops! Something went wrong!");
  //   }
  // }

  // //Function to get  TopRatedPackage package by travelTheme id
  // async getTopRatedPackagePackagesByTravelThemeId(travelThemeId) {
  //   try {
  //     const response = await this.AxiosService.get(
  //       "/api/getTopRatedPackagePackagesByTravelThemeId/" + travelThemeId
  //     );

  //     if (response.status >= 200 || response.status < 300) {
  //       return {
  //         data: response.data.data,
  //         message: response.data.message,
  //       };
  //     }
  //     throw new Error(response.data.message || "Oops! Something went wrong!");
  //   } catch (error) {
  //     if (error.response) {
  //       // Server responded with a status other than 2xx
  //       throw new Error(
  //         error.response.data.message || "Oops! Something went wrong!"
  //       );
  //     } else if (error.request) {
  //       throw new Error("Oops! Failed to connect to the server");
  //     }
  //     throw new Error("Oops! Something went wrong!");
  //   }
  // }

  // //Function to get  TopRatedPackage package by destination id
  // async updateTopRatedPackagePackage(formData, TopRatedPackagePackageId) {
  //   try {
  //     const response = await this.AxiosService.put(
  //       "/api/updateTopRatedPackagePackage/" + TopRatedPackagePackageId,
  //       formData
  //     );

  //     if (response.status >= 200 || response.status < 300) {
  //       return {
  //         data: response.data.data,
  //         message: response.data.message,
  //       };
  //     }
  //     throw new Error(response.data.message || "Oops! Something went wrong!");
  //   } catch (error) {
  //     if (error.response) {
  //       // Server responded with a status other than 2xx
  //       throw new Error(
  //         error.response.data.message || "Oops! Something went wrong!"
  //       );
  //     } else if (error.request) {
  //       throw new Error("Oops! Failed to connect to the server");
  //     }
  //     throw new Error("Oops! Something went wrong!");
  //   }
  // }

  //Function to delete  TopRatedPackage package by  id
  async deleteTopRatedPackage(topRatedPackagePackageId) {
    try {
      const response = await this.AxiosService.delete(
        "/api/deleteTopRatedPackage/" + topRatedPackagePackageId
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
}

export default TopRatedPackageRepository;
