import Button from "@/components/Button";
import AnimalInfo from "@/components/LostWrite/AnimalInfo";
import styles from "@/styles/pages/lostWrite.module.css";
import { useCallback, useState } from "react";

export default function LostWrite() {
  const [page, setPage] = useState<number>(1);
  // 이전 다음 눌렀을때 스크롤 맨 위로 가는 로직 넣어야함
  const onClickPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage((state) => state - 1);
    }
  }, [page]);
  const onClickNextPage = useCallback(() => {
    if (page < 3) {
      setPage((state) => state + 1);
    }
  }, [page]);

  return (
    <main className={styles.lostWrite_wrapper}>
      {page === 1 && <AnimalInfo />}

      <footer className={styles.footer}>
        <div className={styles.progress_bar}>
          <div className={styles.bar}>
            <div
              className={`${styles.is_bar_fill} ${
                page >= 1 ? styles.fill : ""
              }`}
            ></div>
          </div>
          <div className={styles.bar}>
            <div
              className={`${styles.is_bar_fill} ${
                page >= 2 ? styles.fill : ""
              }`}
            ></div>
          </div>
          <div className={styles.bar}>
            <div
              className={`${styles.is_bar_fill} ${
                page >= 3 ? styles.fill : ""
              }`}
            ></div>
          </div>
        </div>
        <div className={styles.button_wrapper}>
          <button onClick={onClickPreviousPage} className={styles.back}>
            이전
          </button>
          <button onClick={onClickNextPage} className={styles.next}>
            다음
          </button>
        </div>
      </footer>
    </main>
  );
}
