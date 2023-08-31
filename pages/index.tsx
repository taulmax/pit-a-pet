import styles from "@/styles/pages/index.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main_wrapper}>
      {/* 메인 배경 이미지 */}
      <Image
        className={styles.main_background_image}
        src="/img/corgi.jpg"
        alt="메인 배경 이미지"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      {/* Pit a pet 설명 글 */}
      <div className={styles.welcome_text}>
        <h1>PIT-A-PAT = &quot;두근두근&quot;</h1>
        <span>
          영어로 ‘두근두근’이라는 뜻을 가진 PIT-A-PAT이라는 단어를
          <br />
          소중한 생명들과 나누세요.
          <br />
          우리의 신중한 선택이
          <br />
          우리와 아이들의 행복을 “책임”집니다.
        </span>
      </div>
    </main>
  );
}
