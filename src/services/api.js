import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-app-backend-m5y1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
