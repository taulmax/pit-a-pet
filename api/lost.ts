import { useMutation, useQueryClient } from "react-query";
import axios from "./axios";

// 우리 아이 찾기 GET interface
export interface LostData {
  lostNo: string;
  lostPlace: string;
  lostDate: string;
  title: string;
  description: string;
  image: string;
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

// 우리 아이 찾기 POST
export const postLost = async (postData: PostLostData): Promise<LostData> => {
  const response = await axios.post("/lost", postData);
  return response.data;
};

// React Query를 사용하여 POST 요청을 처리하는 Hook을 생성합니다.
export const usePostLost = () => {
  const queryClient = useQueryClient();

  // useMutation Hook을 사용하여 POST 요청을 처리합니다.
  const { mutateAsync } = useMutation(postLost, {
    // POST 요청이 성공할 때 실행됩니다.
    onSuccess: () => {
      // 이 부분에 필요한 작업을 추가할 수 있습니다.
      // 예를 들어, 데이터를 다시 가져오는 등의 작업을 수행할 수 있습니다.
      queryClient.invalidateQueries("lostData"); // 예제에서 "lostData"는 데이터를 가져오는 쿼리의 키입니다.
    },
  });

  return { postLost: mutateAsync };
};
