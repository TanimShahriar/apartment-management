import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000"
})
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOutt } = useAuth();

  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access-token")
    // console.log("stopped by interceptors", token)
    config.headers.authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  })
  //intercepts 401, 403 status
  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const status = error.response.status;
    // console.log("status error in the interceptor", status)
    // status 401, 403 logout the user, move the user to the login page
    if (status === 401 || status === 403) {
      await signOutt();
      navigate("/signIn")
    }
    return Promise.reject(error);
  })

  return axiosSecure;
};

export default useAxiosSecure;