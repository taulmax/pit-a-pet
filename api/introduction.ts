import axios from "./axios";

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

export const getIdle = async (params: {
  page: number;
  pageSize: number;
  startDate: string;
  endDate: string;
}): Promise<{ data: IdleData[]; pageCount: number }> => {
  const response = await axios.get("/idle/data", { params });
  return response.data;
};

export const getIdleDetail = async (desertionNo: string): Promise<IdleData> => {
  const response = await axios.get("/idle/detail", { params: { desertionNo } });
  return response.data;
};
