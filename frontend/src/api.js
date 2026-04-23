import axios from "axios";

const API = axios.create({
  baseURL: "https://grievance-backend-keem.onrender.com/api"
});

export default API;