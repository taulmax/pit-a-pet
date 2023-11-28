import axios from "./axios";
import { useMutation, useQueryClient } from "react-query";

export interface IdleData {
  desertionNo: string;
  filename: string;
  happenDt: string;
  happenPlace: string;
  kindCd: string;
  colorCd: string;
  age: string;
  weight: string;
  noticeNo: string;
  noticeSdt: string;
  noticeEdt: string;
  popfile: string;
  processState: string;
  sexCd: string;
  neuterYn: string;
  specialMark: string;
  careNm: string;
  careTel: string;
  careAddr: string;
  orgNm: string;
  chargeNm: string;
  officetel: string;
}

export interface PatchDibData {
  desertionNo: string;
}

export const getIdle = async (params: {
  page: number;
  pageSize: number;
  startDate: string;
  endDate: string;
  type?: any;
  isUnderProtection?: any;
  region?: any;
}): Promise<{ data: IdleData[]; pageCount: number }> => {
  const response = await axios.get("/idle/data", { params });
  return response.data;
};

export const getIdleDetail = async (desertionNo: string): Promise<IdleData> => {
  const response = await axios.get("/idle/detail", { params: { desertionNo } });
  return response.data;
};

export const patchDib = async (data: PatchDibData): Promise<any> => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const response = await axios.patch("/mypage/dib", data, { headers });
  return response.data;
};

export const usePatchDib = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(patchDib, {
    onSuccess: () => {
      // 이 부분에서 필요한 경우 캐시를 업데이트할 수 있습니다.
      queryClient.invalidateQueries(/* queryKey */);
    },
  });

  const patchDibRequest = async (data: PatchDibData) => {
    // 이 부분에서 필요한 로직을 추가할 수 있습니다.
    return mutateAsync(data);
  };

  return { patchDib: patchDibRequest };
};

export const patchDibDelete = async (data: PatchDibData): Promise<any> => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const response = await axios.patch("/mypage/deleteDib", data, { headers });
  return response.data;
};

export const usePatchDibDelete = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(patchDibDelete, {
    onSuccess: () => {
      // 이 부분에서 필요한 경우 캐시를 업데이트할 수 있습니다.
      queryClient.invalidateQueries(/* queryKey */);
    },
  });

  const patchDibDeleteRequest = async (data: PatchDibData) => {
    // 이 부분에서 필요한 로직을 추가할 수 있습니다.
    return mutateAsync(data);
  };

  return { patchDibDelete: patchDibDeleteRequest };
};
