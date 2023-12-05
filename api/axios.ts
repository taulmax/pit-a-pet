import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "http://192.168.165.59:8080",
});

export default instance;
