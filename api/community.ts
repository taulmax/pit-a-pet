import { useMutation, useQueryClient } from "react-query";
import axios from "./axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// 커뮤니티 게시글 interface
export interface Story {
  post_id: number;
  username: string;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface StoryDetail {
  post: {
    post_id: number;
    username: string;
    title: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    content: string;
  };
  replies: {
    content: string;
    created_at: string;
    post_id: number;
    reply_id: number;
    updated_at: string;
    username: string;
  }[];
}

export interface IUseStory {
  title: string;
  content: string;
}
// 커뮤니티 게시글 GET
export const getStory = async (params: {
  page: number;
  pageSize: number;
}): Promise<{ data: Story[]; pageCount: number }> => {
  const response = await axios.get("/community/data", { params });
  return response.data;
};

// 커뮤니티 게시글 DETAIL GET
export const getStoryDetail = async (post_id: string): Promise<StoryDetail> => {
  const response = await axios.get("/community/detail", {
    params: { post_id },
  });
  return response.data;
};

export const useStory = () => {
  const router = useRouter();
  const createPost = useMutation(createCommunityPost);

  async function createCommunityPost({ title, content }: IUseStory) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const response = await axios.post(
      "/community/post",
      { title, content },
      { headers }
    );
    return response.data;
  }

  const postStory = async (storyData: IUseStory) => {
    try {
      const response = await createPost.mutateAsync(storyData);
      console.log(response);

      router.push(`/community/${response}`);
    } catch (error) {
      console.error("게시물 작성 실패:", error);
      toast.error("게시물 작성에 실패했어요.");
    }
  };

  return { postStory, isLoading: createPost.isLoading };
};
