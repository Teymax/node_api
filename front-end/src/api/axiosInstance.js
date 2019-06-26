import axios from 'axios';

// api instance
const api = axios.create({
  baseURL: 'http://localhost:9000'
});

export default api;
