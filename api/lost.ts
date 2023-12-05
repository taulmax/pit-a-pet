import { useMutation, useQueryClient } from "react-query";
import axios from "./axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// 우리 아이 찾기 GET interface
export interface LostData {
  lostNo: string;
  type: string;
  sexCd: string;
  neuterYn: string;
  petName: string;
  age: string;
  weight: string;
  furColor: string;
  lostPlace: string;
  lostDate: string;
  tel: string;
  reward: string;
  title: string;
  detail: string;
  images: {
    lostNo: string;
    image1: string; // 이미지 1
    image2?: string; // 이미지 2
    image3?: string; // 이미지 3
    image4?: string; // 이미지 4
  };
  replies: {
    content: string;
    created_at: string;
    post_id: number;
    reply_id: number;
    updated_at: string;
    username: string;
  }[];
  createdDate: string;
}

// 우리 아이 찾기 POST interface
export interface PostLostData {
  type: string;
  sexCd: string;
  neuterYn: string;
  petName: string;
  age: string;
  weight: string;
  furColor: string;
  feature: string;
  image: Blob[];
  lostPlace: string;
  lostDate: string;
  tel: string;
  reward: string;
  detail: string;
}

interface IUseLostReply {
  lostNo: string;
  content: string;
}

interface IUseDeleteLostReply {
  reply_id: string;
}

// 우리 아이 찾기 GET
export const getLost = async (params: {
  page: number;
  pageSize: number;
}): Promise<{ data: LostData[]; pageCount: number }> => {
  const response = await axios.get("/lost/data", { params });
  return response.data;
};

export const postLost = async (postData: FormData): Promise<LostData> => {
  const response = await axios.post("/lost", postData);
  return response.data;
};

export const usePostLost = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(postLost, {
    onSuccess: () => {
      queryClient.invalidateQueries("lostData");
    },
  });

  const postLostWithFormData = async (postData: PostLostData) => {
    const formData = new FormData();

    // PostLostData 객체의 속성들을 FormData에 추가
    formData.append("type", postData.type);
    formData.append("sexCd", postData.sexCd);
    formData.append("neuterYn", postData.neuterYn);
    formData.append("petName", postData.petName);
    formData.append("age", postData.age);
    formData.append("weight", postData.weight);
    formData.append("furColor", postData.furColor);
    formData.append("feature", postData.feature);

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < postData.image.length; i++) {
      formData.append("image", postData.image[i]);
    }

    formData.append("lostPlace", postData.lostPlace);
    formData.append("lostDate", postData.lostDate);
    formData.append("tel", postData.tel);
    formData.append("reward", postData.reward);
    formData.append("detail", postData.detail);

    // postLost 함수를 호출하여 FormData를 서버로 전송
    return mutateAsync(formData);
  };

  return { postLost: postLostWithFormData };
};

export const getLostDetail = async (lostNo: string): Promise<LostData> => {
  const response = await axios.get("/lost/detail", { params: { lostNo } });
  return response.data;
};

export const useLostReply = () => {
  const router = useRouter();
  const createReply = useMutation(createLostReply);

  async function createLostReply({ lostNo, content }: IUseLostReply) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const response = await axios.post(
      "/lostReply/post",
      { lostNo, content },
      { headers }
    );
    return response.data;
  }

  const postLostReply = async (replyData: IUseLostReply) => {
    try {
      const response = await createReply.mutateAsync(replyData);
      console.log(response);
      router.reload();
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      toast.error("댓글 작성에 실패했어요.");
    }
  };

  const deleteReply = useMutation(deleteLostReply);

  async function deleteLostReply({ reply_id }: IUseDeleteLostReply) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const data = { reply_id };
    const response = await axios.delete("/lostReply/deleteReply", {
      data,
      headers,
    });

    return response.data;
  }

  const deleteMyReply = async (deleteData: IUseDeleteLostReply) => {
    try {
      const response = await deleteReply.mutateAsync(deleteData);
      console.log(response);
      router.reload();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      toast.error("댓글 삭제에 실패했어요.");
    }
  };

  return { postLostReply, deleteMyReply };
};
