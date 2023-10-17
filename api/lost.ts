import { useMutation, useQueryClient } from "react-query";
import axios from "./axios";

// 우리 아이 찾기 GET interface
export interface LostData {
  lostNo: string;
  lostPlace: string;
  lostDate: string;
  title: string;
  description: string;
  images: {
    lostNo: string;
    image1: string; // 이미지 1
    image2?: string; // 이미지 2
    image3?: string; // 이미지 3
    image4?: string; // 이미지 4
  };
  tel: string;
  reward: string;
  type: string;
  createdDate: string;
  sexCd: string;
}

// 우리 아이 찾기 POST interface
export interface PostLostData {
  type: string;
  sexCd: string;
  neuterYn: string;
  age: string;
  weight: string;
  furColor: string;
  feature: string;
  image: Blob[];
  lostPlace: string;
  lostDate: string;
  reward: string;
  detail: string;
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
