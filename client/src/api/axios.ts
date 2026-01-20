import axios, { AxiosError } from "axios";
import type { ApiErrorResponse } from "../@types/api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          console.error("Dữ liệu gửi lên không hợp lệ:", data.message);
          break;
        case 401:
          console.error(data.message);
          break;
        case 409:
          console.error(data.message);
          break;
        case 500:
          console.error("Internal Server error");
          break;
        default:
          console.error(`Lỗi không xác định: ${status}`);
      }
    } else if (error.request) {
      // Request đã gửi nhưng không nhận được phản hồi (Lỗi mạng)
      console.error("Không thể kết nối đến Server. Vui lòng kiểm tra Internet");
    } else {
      // Lỗi xảy ra trong quá trình thiết lập request
      console.error("Lỗi cấu hình:", error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
