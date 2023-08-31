import styles from "@/styles/components/Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.main_nav}>
      <li>아이들 소개</li>
      <li>우리 아이 찾기</li>
      <li>반려동물 관련정보</li>
      <li>커뮤니티</li>
      <li>내정보</li>
    </nav>
  );
}
