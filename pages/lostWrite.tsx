import AnimalInfo from "@/components/LostWrite/AnimalInfo";
import LostInfo from "@/components/LostWrite/LostInfo";
import styles from "@/styles/pages/lostWrite.module.css";
import { useCallback, useRef, useState } from "react";

export default function LostWrite() {
  const lostWriteWrapperRef = useRef<HTMLElement | null>(null);
  const [page, setPage] = useState<number>(1);
  // 이전 다음 눌렀을때 스크롤 맨 위로 가는 로직 넣어야함
  // 칩이 있는지 없는지
  // 강아지 이름
  // 등등 필요한 정보가 더 있을지? 있으면 제목하고 게시글이 필요 없어지지 않을까..?
  // 본인인증을 한번 해볼까
  // 프로필에서 본인인증 할수있고, 본인인증 되어야 글쓸수 있게 하는건 어떤가...
  const onClickPreviousPage = useCallback(() => {
    if (page > 1) {
      lostWriteWrapperRef.current!.scrollTop = 0;
      setPage((state) => state - 1);
    }
  }, [page]);
  const onClickNextPage = useCallback(() => {
    if (page < 4) {
      lostWriteWrapperRef.current!.scrollTop = 0;
      setPage((state) => state + 1);
    }
  }, [page]);

  return (
    <main ref={lostWriteWrapperRef} className={styles.lostWrite_wrapper}>
      {page === 1 && <AnimalInfo />}
      {page === 2 && <LostInfo />}

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
          <div className={styles.bar}>
            <div
              className={`${styles.is_bar_fill} ${
                page >= 4 ? styles.fill : ""
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
