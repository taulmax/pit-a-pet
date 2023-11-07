import axios from "axios";

export const getKakaoAnimalHospital = async (
  lat: number,
  lng: number,
  authorization: string
): Promise<any> => {
  const response = await axios.get(
    "https://dapi.kakao.com/v2/local/search/keyword.json",
    {
      params: {
        query: "동물병원",
        category_group_code: "HP8",
        x: String(lng),
        y: String(lat),
        radius: 3000,
      },
      headers: {
        Authorization: `KakaoAK ${authorization}`,
      },
    }
  );
  return response.data;
};
