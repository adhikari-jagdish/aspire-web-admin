import AuthAxiosService from "../../common/service/auth_axios_service";
import UserModel from "../model/user_model";

class AuthRepository {
  constructor(getToken) {
    this.axiosService = new AuthAxiosService(getToken); // Pass getToken to AxiosService
  }
  async login(username, password) {
    try {
      const response = await this.axiosInstance.post("/user/login", {
        username,
        password,
      });

      if (response.status === 200) {
        ///Check if authorization exists in headers
        let bearerToken;
        if (
          response.headers.authorization &&
          response.headers.authorization.startsWith("Bearer ")
        ) {
          bearerToken = response.headers.authorization.slice(7);
        } else {
          throw new Error("Invalid or missing Authorization header");
        }

        return {
          user: UserModel.fromJson(response.data.data),
          token: bearerToken,
        };
      }
      throw new Error(response.data.error || "Invalid email or password");
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(
          error.response.data.error || "Invalid email or password"
        );
      } else if (error.request) {
        throw new Error("Failed to connect to the server");
      }
      throw new Error("An error occurred during login");
    }
  }
}

export default AuthRepository;
