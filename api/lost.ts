import axios from "./axios";

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

export const getLost = async (params: {
  page: number;
  pageSize: number;
}): Promise<{ data: LostData[]; pageCount: number }> => {
  const response = await axios.get("/lost/data", { params });
  return response.data;
};
