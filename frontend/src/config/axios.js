<<<<<<< HEAD
import axios from 'axios';

export const axiosi = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "https://mern-backend-kpl5.onrender.com",
    withCredentials: true
=======
import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  "https://mern-backend-kpl5.onrender.com";

export const axiosi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
>>>>>>> 9fbc4c2b54cdffcb0f215a5c148d1d17581fe4db
});