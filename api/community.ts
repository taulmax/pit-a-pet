import { useMutation, useQueryClient } from "react-query";
import axios from "./axios";

// 커뮤니티 게시글 interface
export interface Story {
  post_id: number;
  username: string;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

// 커뮤니티 게시글 GET
export const getStory = async (params: {
  page: number;
  pageSize: number;
}): Promise<{ data: Story[]; pageCount: number }> => {
  const response = await axios.get("/community/data", { params });
  return response.data;
};
