import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // API 엔드포인트에 맞게 수정
});

export default instance;
