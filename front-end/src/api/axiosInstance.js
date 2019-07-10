import axios from "axios";

// api instance

const api = axios.create({
  baseURL: "http://165.227.171.95:9000"
});


export default api;
