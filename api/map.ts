import axios from "axios";

export const getKakaoMap = async (
  tab: "동물병원" | "동물보호소" | "동물등록 대행업체",
  lat: number,
  lng: number,
  authorization: string
): Promise<any> => {
  let params: any = { query: tab };
  if (tab === "동물병원") {
    params.category_group_code = "HP8";
    params.x = String(lng);
    params.y = String(lat);
    params.radius = 5000;
  }
  const response = await axios.get(
    "https://dapi.kakao.com/v2/local/search/keyword.json",
    {
      params,
      headers: {
        Authorization: `KakaoAK ${authorization}`,
      },
    }
  );
  return response.data;
};
