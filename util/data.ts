import { faMap } from "@fortawesome/free-regular-svg-icons";
import {
  faGlobe,
  faMagnifyingGlass,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";

// 네비게이션 메뉴
export const MAIN_MENU = [
  {
    title: "아이들 소개",
    link: "/introduction",
    icon: faPaw,
  },
  {
    title: "내 아이가 사라졌어요",
    link: "/lost",
    icon: faMagnifyingGlass,
  },
  {
    title: "주변 동물 시설",
    link: "/map",
    icon: faMap,
  },
  {
    title: "커뮤니티",
    link: "/community",
    icon: faGlobe,
  },
];

export const CURRENT_LOCATION_MARKER = () =>
  '<img src="./img/map-marker.png" style="width: 30px; height: 30px;">';

export const PLACE_LOCATION_MARKER = (place_name: string) =>
  `<div style="display:flex;align-items:center;"><img src="./img/map-marker-blue.png" style="width: 32px; height: 32px; z-index:10;"><span style="background-color:white;padding:10px 14px;border-radius:20px;margin-left:-12px;border:1px solid #c6c6c6;font-size:14px;font-family:'NanumSquareBold'">${place_name}</span></div>`;
