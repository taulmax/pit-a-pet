import AnimalInfo from "@/components/LostWrite/AnimalInfo";
import ContentInfo from "@/components/LostWrite/ContentInfo";
import LostInfo from "@/components/LostWrite/LostInfo";
import RewardInfo from "@/components/LostWrite/RewardInfo";
import styles from "@/styles/pages/lostWrite.module.css";
import { formatNumber } from "@/util/util";
import { useCallback, useEffect, useRef, useState } from "react";

export interface IAnimalInfo {
  type: "dog" | "cat" | "rest" | ""; // 품종
  sex: "boy" | "girl" | "unknown" | ""; // 성별
  neutered: "Y" | "N" | "U" | ""; // 중성화
  name: string; // 이름
  age: string; // 나이
  weight: string; // 몸무게
  furColor: string; // 털색
  feature: string; // 특징
}

export interface ILostInfo {
  lostDate: string; // 실종 시간
  lostPlace: string; // 실종 장소
}

export default function LostWrite() {
  // [입력 정보]
  // AninalInfo - 아이의 정보를 알려주세요
  const [animalInfo, setAnimalInfo] = useState<IAnimalInfo>({
    type: "",
    sex: "",
    neutered: "",
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

  const onClickIconSelectButton = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const id = e.currentTarget.dataset.id as string;
      const clicked = e.currentTarget.dataset.type as string;
      if (id === clicked) {
        setAnimalInfo((state) => ({ ...state, [id]: "" }));
      } else {
        setAnimalInfo((state) => ({ ...state, [id]: clicked }));
      }
    },
    []
  );

  // LostInfo - 아이를 놓쳤을때의 정보를 알려주세요
  const [lostInfo, setLostInfo] = useState<ILostInfo>({
    lostDate: "",
    lostPlace: "",
  });

  const onChangeLostInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLostInfo((state) => ({ ...state, [e.target.id]: e.target.value }));
    },
    []
  );

  // RewardInfo - 사례금을 알려주세요
  const [rewardInfo, setRewardInfo] = useState<string>("");
  const onChangeRewardInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (inputValue.replaceAll(",", "").length < 10) {
        // 첫 번째 자릿수가 0이면 제거합니다.
        const formattedValue = inputValue.startsWith("0")
          ? inputValue.substring(1)
          : inputValue;

        const finalFormattedValue = formatNumber(formattedValue);
        setRewardInfo(finalFormattedValue);
      }
    },
    []
  );

  // RewardInfo - 사례금을 알려주세요
  const [contentInfo, setContentInfo] = useState<string>("");
  const onChangeContentInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setContentInfo(e.target.value),
    []
  );

  // 페이지 관련
  const lostWriteWrapperRef = useRef<HTMLElement | null>(null);
  const [page, setPage] = useState<number>(0);
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

  useEffect(() => {
    setPage(1);
  }, []);

  return (
    <main ref={lostWriteWrapperRef} className={styles.lostWrite_wrapper}>
      {/* 아이의 정보를 알려주세요 */}
      {page === 1 && (
        <AnimalInfo
          values={animalInfo}
          onClick={onClickIconSelectButton}
          onChange={onChangeAnimalInfo}
        />
      )}

      {/* 아이를 놓쳤을 때의 정보를 알려주세요 */}
      {page === 2 && <LostInfo values={lostInfo} onChange={onChangeLostInfo} />}

      {/* 사례금을 알려주세요 */}
      {page === 3 && (
        <RewardInfo value={rewardInfo} onChange={onChangeRewardInfo} />
      )}

      {/* 보다 자세한 내용을 알려주세요 */}
      {page === 4 && (
        <ContentInfo value={contentInfo} onChange={onChangeContentInfo} />
      )}

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
