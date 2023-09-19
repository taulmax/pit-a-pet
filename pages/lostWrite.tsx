import AnimalInfo from "@/components/LostWrite/AnimalInfo";
import ContentInfo from "@/components/LostWrite/ContentInfo";
import LostInfo from "@/components/LostWrite/LostInfo";
import RewardInfo from "@/components/LostWrite/RewardInfo";
import styles from "@/styles/pages/lostWrite.module.css";
import { useCallback, useRef, useState } from "react";

export interface IAnimalInfo {
  name: string; // 이름
  age: string; // 나이
  weight: string; // 몸무게
  furColor: string; // 털색
  feature: string; // 특징
}

export default function LostWrite() {
  const lostWriteWrapperRef = useRef<HTMLElement | null>(null);
  const [page, setPage] = useState<number>(1);
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

  // [입력 정보]
  // AninalInfo - 아이의 정보를 알려주세요
  const [animalInfo, setAnimalInfo] = useState<IAnimalInfo>({
    name: "",
    age: "",
    weight: "",
    furColor: "",
    feature: "",
  });
  const onChangeAnimalInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnimalInfo((state) => ({ ...state, [e.target.id]: e.target.value }));
    },
    []
  );

  return (
    <main ref={lostWriteWrapperRef} className={styles.lostWrite_wrapper}>
      {page === 1 && (
        <AnimalInfo values={animalInfo} onChange={onChangeAnimalInfo} />
      )}
      {page === 2 && <LostInfo />}
      {page === 3 && <RewardInfo />}
      {page === 4 && <ContentInfo />}

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
