import axios from "axios";

const api = axios.create({

  baseURL:
    "https://ford-auto-intelligence-api.onrender.com/api"
});

export default api;