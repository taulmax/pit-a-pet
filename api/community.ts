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
  like: number;
  view: number;
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
    view: number;
    like: number;
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

export interface IUseReply {
  post_id: any;
  content: string;
}

export interface IUseDeleteStory {
  post_id: any;
}

export interface IUseDeleteReply {
  reply_id: any;
}

export interface IUseUpdateStory {
  post_id: any;
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

export const useReply = () => {
  const router = useRouter();
  const createReply = useMutation(createCommunityReply);

  async function createCommunityReply({ post_id, content }: IUseReply) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const response = await axios.post(
      "/reply/post",
      { post_id, content },
      { headers }
    );
    return response.data;
  }

  const postReply = async (replyData: IUseReply) => {
    try {
      const response = await createReply.mutateAsync(replyData);
      console.log(response);
      router.reload();
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      toast.error("댓글 작성에 실패했어요.");
    }
  };

  return { postReply, isReplyLoading: createReply.isLoading };
};

export const useDeleteStory = () => {
  const router = useRouter();
  const deleteStory = useMutation(deleteCommunityStory);

  async function deleteCommunityStory({ post_id }: IUseDeleteStory) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const data = { post_id };
    const response = await axios.delete("/community/deletePost", {
      data,
      headers,
    });

    return response.data;
  }

  const deleteMyStory = async (deleteData: IUseDeleteStory) => {
    try {
      const response = await deleteStory.mutateAsync(deleteData);
      console.log(response);
      router.push("/community");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      toast.error("게시글 삭제에 실패했어요.");
    }
  };

  return { deleteMyStory, isDeleteStoryLoading: deleteStory.isLoading };
};

export const useDeleteReply = () => {
  const router = useRouter();
  const deleteReply = useMutation(deleteCommunityReply);

  async function deleteCommunityReply({ reply_id }: IUseDeleteReply) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const data = { reply_id };
    console.log(data);
    const response = await axios.delete("/reply/deleteReply", {
      data,
      headers,
    });

    return response.data;
  }

  const deleteMyReply = async (deleteData: IUseDeleteReply) => {
    try {
      const response = await deleteReply.mutateAsync(deleteData);
      console.log(response);
      router.reload();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      toast.error("댓글 삭제에 실패했어요.");
    }
  };

  return { deleteMyReply, isDeleteReplyLoading: deleteReply.isLoading };
};

export const useUpdateStory = () => {
  const router = useRouter();
  const updateStory = useMutation(updateCommunityStory);

  async function updateCommunityStory({
    post_id,
    title,
    content,
  }: IUseUpdateStory) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const data = { title, content };
    const response = await axios.patch(
      `/community/editPost?post_id=${post_id}`,
      data,
      { headers }
    );

    return response.data;
  }

  const updateMyStory = async (updateData: IUseUpdateStory) => {
    try {
      const response = await updateStory.mutateAsync(updateData);
      console.log(response);
      router.push("/community");
      toast.success("게시글 수정을 완료했어요.");
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      toast.error("게시글 수정에 실패했어요.");
    }
  };

  return { updateMyStory, isDeleteReplyLoading: updateStory.isLoading };
};
