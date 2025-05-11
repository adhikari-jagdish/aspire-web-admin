import axios from 'axios';
import UserModel from '../model/user_model';

class AuthRepository {
    constructor() {
        this.apiUrl = 'http://139.59.25.108:9001';
        this.axiosInstance = axios.create({
            baseURL: this.apiUrl,
            headers: { 'Content-Type': 'application/json' },
        });

        // Interceptor to add token to Authorization header
        this.axiosInstance.interceptors.request.use((config) => {
            const token = this.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`; // Add Bearer prefix if required
            }
            return config;
        });
    }
    async login(username, password) {
        console.log(username, password);

        try {

            const response = await this.axiosInstance.post('/user/login', { username, password });

            if (response.status === 200) {
                ///Check if authorization exists in headers
                let bearerToken;
                if (response.headers.authorization && response.headers.authorization.startsWith('Bearer ')) {
                    bearerToken = response.headers.authorization.slice(7);
                } else {
                    throw new Error('Invalid or missing Authorization header');
                }

                return { user: UserModel.fromJson(response.data.data), token: bearerToken };
            } else {
                return { success: false, error: response.data.error || 'Invalid email or password' };
            }
        } catch (error) {
            
            if (error.response) {
                // Server responded with a status other than 2xx
                return { success: false, error: error.response.data.error || 'Invalid email or password' };
            } else if (error.request) {
                // No response received
                return { success: false, error: 'Failed to connect to the server' };
            } else {
                // Other errors
                return { success: false, error: 'An error occurred during login' };
            }
        }
    }

    saveToken(token) {
        localStorage.setItem('token', token);
    }

    saveUser(user) {
        localStorage.setItem('user', JSON.stringify(user.toJson())); // Serialize user
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    removeUser() {
        localStorage.removeItem('user');
    }


    getToken() {
        return localStorage.getItem('token');
    }

    getUser() {
        const userJson = localStorage.getItem('user');
        return userJson ? UserModel.fromJson(JSON.parse(userJson)) : null; // Parse user
    }

}

export default new AuthRepository();