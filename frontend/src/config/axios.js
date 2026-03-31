import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  "https://mern-ecommerce-main-backend.onrender.com/";

export const axiosi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});