import styles from "@/styles/pages/index.module.css";

export default function Home() {
  return (
    <main className={styles.main_wrapper}>
      <div className={styles.welcome_text}>
        <span className={styles.title}>
          <span className={styles.pit_a_pat}>PIT-A-PAT</span>
          <span>&nbsp; = &quot;두근두근&quot;</span>
        </span>
        <span className={styles.description}>
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
