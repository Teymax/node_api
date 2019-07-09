import axios from "axios";

// api instance

const api = axios.create({
  baseURL: "http://localhost:9000"
});

console.dir(api.defaults.baseURL);

export default api;
