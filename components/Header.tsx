import styles from "@/styles/components/Header.module.css";
import Nav from "./Nav";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleInfo,
  faGlobe,
  faHouse,
  faMagnifyingGlass,
  faPaw,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";
import Button from "./Button";

export default function Header() {
  const [isBurgerMenuOn, setIsBurgerMenuOn] = useState(false);
  const onClickBurgerMenu = useCallback(() => {
    setIsBurgerMenuOn((state) => !state);
  }, []);
  return (
    <header className={styles.main_header}>
      {/* 로고 */}
      <div className={styles.logo_wrapper}>
        <Link href="/">
          <div className={styles.logo}></div>
        </Link>
      </div>

      {/* 네비게이션 */}
      <div className={styles.nav_wrapper}>
        <Nav />
      </div>

      {/* 로그인 / 로그아웃 */}
      <div className={styles.auth_wrapper}>
        <span>로그인</span>
      </div>

      {/* 반응형 버거메뉴 */}
      <FontAwesomeIcon
        onClick={onClickBurgerMenu}
        className={styles.burger_menu}
        icon={faBars}
      />
      <div
        className={`${styles.burger_navigation} ${
          isBurgerMenuOn ? styles.burger_on : styles.burger_off
        }`}
      >
        <header className={styles.burger_header}>
          <div className={styles.burger_logo}>PIT-A-PET</div>
          <FontAwesomeIcon
            onClick={onClickBurgerMenu}
            className={styles.burger_close_button}
            icon={faXmark}
          />
        </header>
        <div className={`pl20 pr20 pb20 ${styles.login_wrapper}`}>
          <Button color="logo" text="로그인" />
        </div>
        <Link href="/">
          <li className={styles.burger_list}>
            <FontAwesomeIcon icon={faHouse} />
            <div>홈</div>
          </li>
        </Link>
        <Link href="/introduction">
          <li className={styles.burger_list}>
            <FontAwesomeIcon icon={faPaw} />
            <div>아이들 소개</div>
          </li>
        </Link>
        <Link href="/find">
          <li className={styles.burger_list}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <div>우리 아이 찾기</div>
          </li>
        </Link>
        <Link href="/info">
          <li className={styles.burger_list}>
            <FontAwesomeIcon icon={faCircleInfo} />
            <div>반려동물 관련정보</div>
          </li>
        </Link>
        <Link href="/community">
          <li className={styles.burger_list}>
            <FontAwesomeIcon icon={faGlobe} />
            <div>커뮤니티</div>
          </li>
        </Link>
      </div>
      <div
        onClick={onClickBurgerMenu}
        className={`${styles.burger_dark_layer} ${isBurgerMenuOn ? "" : "off"}`}
      ></div>
    </header>
  );
}
