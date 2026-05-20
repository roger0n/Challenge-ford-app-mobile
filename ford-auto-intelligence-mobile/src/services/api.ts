import axios from "axios";

const api = axios.create({

  baseURL:
    "http://SEU_IP_LOCAL:3333/api"
});

export default api;