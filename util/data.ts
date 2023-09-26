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
