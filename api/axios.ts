import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "http://10.50.72.243:8080",
});

export default instance;
