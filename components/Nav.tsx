import styles from "@/styles/components/Nav.module.css";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className={styles.main_nav}>
      <Link href="/introduction">아이들 소개</Link>
      <Link href="/find">우리 아이 찾기</Link>
      <Link href="/info">반려동물 관련정보</Link>
      <Link href="/community">커뮤니티</Link>
    </nav>
  );
}
