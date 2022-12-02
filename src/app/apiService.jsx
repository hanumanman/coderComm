import { BASE_URL } from "./config";
import axios from "axios";

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    console.log(`start request`, request);
    return request;
  },
  function (error) {
    console.log(`request error`, { error });
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log(`start response`, response);
    return response.data;
  },
  function (error) {
    console.log(`response error`, { error });
    const message = error.response?.data?.errors?.message || "Unknown Error";
    return Promise.reject({ message });
  }
);

export default apiService;
