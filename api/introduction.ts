import axios from "./axios";

export const fetchPosts = async () => {
  const response = await axios.get("/posts");
  return response.data;
};
