import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_IP_REMOTE_SERVER}:8000/api/v1`,
  //baseURL: "http://localhost:8000/api/v1",
});

//Alter defaults after instance has been created

//config axios
// instance.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${localStorage.getItem("token")}`;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
