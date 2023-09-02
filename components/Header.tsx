import styles from "@/styles/components/Header.module.css";
import Nav from "./Nav";
import Link from "next/link";

export default function Header() {
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
    </header>
  );
}
