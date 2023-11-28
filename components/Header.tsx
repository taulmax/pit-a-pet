import styles from "@/styles/components/Header.module.css";
import Nav from "./Nav";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";
import Button from "./Button";
import { MAIN_MENU } from "@/util/data";
import { useRouter } from "next/router";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function Header() {
  const AUTH_PAGE = ["/login", "/resgister"];
  const { isLogin, setIsLogin } = useGlobalState();

  const onClickLogout = useCallback(() => {
    setIsLogin(false);
    localStorage.removeItem("token");
  }, [setIsLogin]);

  const { pathname } = useRouter();
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

      {/* 로그인 페이지에서는 로고만 보이게 */}
      {!AUTH_PAGE.includes(pathname) && (
        <>
          {/* 네비게이션 */}
          <div className={styles.nav_wrapper}>
            <Nav />
          </div>

          {/* 로그인 / 로그아웃 */}
          <div className={styles.auth_wrapper}>
            {isLogin ? (
              <span onClick={onClickLogout}>로그아웃</span>
            ) : (
              <Link href="/login">
                <span>로그인</span>
              </Link>
            )}
          </div>
        </>
      )}

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
          {isLogin ? (
            <Button color="logo" text="로그아웃" onClick={onClickLogout} />
          ) : (
            <Link href="/login">
              <Button color="logo" text="로그인" onClick={onClickBurgerMenu} />
            </Link>
          )}
        </div>
        <Link href="/">
          <li
            className={`${styles.burger_list} ${
              pathname === "/" ? styles.current_page : ""
            }`}
          >
            <FontAwesomeIcon icon={faHouse} />
            <div>홈</div>
          </li>
        </Link>
        {MAIN_MENU.map(({ title, link, icon }) => (
          <Link key={title} href={link}>
            <li
              className={`${styles.burger_list} ${
                pathname === link ? styles.current_page : ""
              }`}
            >
              <FontAwesomeIcon icon={icon} />
              <div>{title}</div>
            </li>
          </Link>
        ))}
      </div>
      <div
        onClick={onClickBurgerMenu}
        className={`${styles.burger_dark_layer} ${isBurgerMenuOn ? "" : "off"}`}
      ></div>
    </header>
  );
}
