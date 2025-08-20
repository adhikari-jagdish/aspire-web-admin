import AxiosService from "../../common/service/axios_service";

class TrendingPackageRepository {
  constructor(getToken) {
    this.AxiosService = new AxiosService(getToken); // Pass getToken to AxiosService
  }

  //Function to add a new TrendingPackage package
  async createTrendingPackage(packageId) {
    try {
      const response = await this.AxiosService.post(
        "/api/createTrendingPackages",
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

  //Function to get all TrendingPackage packages
  async getAllTrendingPackages() {
    try {
      const response = await this.AxiosService.get("/api/getAllTrendingPackages");

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

  // //Function to get  TrendingPackage package by id
  // async getTrendingPackagePackageById(TrendingPackagePackageId) {
  //   try {
  //     const response = await this.AxiosService.get(
  //       "/api/getTrendingPackagePackageById/" + TrendingPackagePackageId
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

  // //Function to get  TrendingPackage package by destination id
  // async getTrendingPackagePackagesByDestinationId(destinationId) {
  //   try {
  //     const response = await this.AxiosService.get(
  //       "/api/getTrendingPackagePackagesByDestinationId/" + destinationId
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

  // //Function to get  TrendingPackage package by travelTheme id
  // async getTrendingPackagePackagesByTravelThemeId(travelThemeId) {
  //   try {
  //     const response = await this.AxiosService.get(
  //       "/api/getTrendingPackagePackagesByTravelThemeId/" + travelThemeId
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

  // //Function to get  TrendingPackage package by destination id
  // async updateTrendingPackagePackage(formData, TrendingPackagePackageId) {
  //   try {
  //     const response = await this.AxiosService.put(
  //       "/api/updateTrendingPackagePackage/" + TrendingPackagePackageId,
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

  //Function to delete  TrendingPackage package by  id
  async deleteTrendingPackage(trendingPackagePackageId) {
    try {
      const response = await this.AxiosService.delete(
        "/api/deleteTrendingPackage/" + trendingPackagePackageId
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

export default TrendingPackageRepository;
