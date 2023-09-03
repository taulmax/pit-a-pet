import {
  faCircleInfo,
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
    title: "우리 아이 찾기",
    link: "/find",
    icon: faMagnifyingGlass,
  },
  {
    title: "반려동물 관련정보",
    link: "/info",
    icon: faCircleInfo,
  },
  {
    title: "커뮤니티",
    link: "/community",
    icon: faGlobe,
  },
];
