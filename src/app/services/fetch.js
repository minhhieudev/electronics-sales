import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MESSAGES from "../../common/const";
import CONST from "../redux/const";

const timeout = CONST.REQUEST.TIME_OUT;
let hasShownToast = false; // Flag to control toast display

// Create an Axios instance with predefined configurations
const SysFetch = axios.create({
  baseURL: CONST.URL.API, 
  timeout, 
  headers: {
    "Content-Type": "application/json", 
  },
});

// Interceptor to update the token before each request
SysFetch.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem(CONST.STORAGE.ACCESS_TOKEN);
      if (accessToken) {
        config.headers = {
          ...config.headers, 
          Authorization: `Bearer ${accessToken}`, // Add authorization token
        };
      }
    }
    return config;
  },
  (error) => Promise.reject(error) 
);

// Interceptor to handle responses and errors
SysFetch.interceptors.response.use(
  (response) => response.data, 
  (error) => {
    if (!error.response) {
      toast.error(MESSAGES.NETWORK_ERROR); // Sử dụng biến NETWORK_ERROR
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // Handle token expiration (401 Unauthorized)
    if (
      error.response.status === 401 &&
      error.response.data?.message === MESSAGES.INVALID_TOKEN &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite retry loop
      if (!hasShownToast) {
        toast.error(MESSAGES.SESSION_EXPIRED_MESSAGE);
        hasShownToast = true; 
      }
    
      localStorage.clear(); 
      setTimeout(() => {
        window.location.href = "/auth"; 
      }, 2000);
    }

    return Promise.reject(error); 
  }
);

export default SysFetch;
