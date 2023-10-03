import { usePostLost } from "@/api/lost";
import AnimalInfo from "@/components/LostWrite/AnimalInfo";
import ContentInfo from "@/components/LostWrite/ContentInfo";
import LostInfo from "@/components/LostWrite/LostInfo";
import RewardInfo from "@/components/LostWrite/RewardInfo";
import styles from "@/styles/pages/lostWrite.module.css";
import { convertFilesToBlob, formatNumber } from "@/util/util";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export interface IAnimalInfo {
  type: "dog" | "cat" | "rest" | ""; // 품종
  sexCd: "boy" | "girl" | "unknown" | ""; // 성별
  neuterYn: "Y" | "N" | "U" | ""; // 중성화
  name: string; // 이름
  age: string; // 나이
  weight: string; // 몸무게
  furColor: string; // 털색
  feature: string; // 특징
  image: Blob[]; // 아이 이미지
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
    sexCd: "",
    neuterYn: "",
    name: "",
    age: "",
    weight: "",
    furColor: "",
    feature: "",
    image: [],
  });

  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    setAnimalInfo((state) => ({ ...state, image: convertFilesToBlob(files) }));
  }, [files]);

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
  const [reward, setReward] = useState<string>("");
  const onChangeRewardInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (inputValue.replaceAll(",", "").length < 10) {
        // 첫 번째 자릿수가 0이면 제거합니다.
        const formattedValue = inputValue.startsWith("0")
          ? inputValue.substring(1)
          : inputValue;

        const finalFormattedValue = formatNumber(formattedValue);
        setReward(finalFormattedValue);
      }
    },
    []
  );

  // contentInfo - 내용을 알려주세요
  const [detail, setDetail] = useState<string>("");
  const onChangeContentInfo = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setDetail(e.target.value),
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

  const { postLost } = usePostLost();
  const router = useRouter();
  const handleComplete = useCallback(async () => {
    try {
      const postData = {
        ...animalInfo,
        ...lostInfo,
        reward,
        detail,

        // 밑에 애들은 나중에 치워줘야함
        lostDate: "2023-09-27",
      };
      const response = await postLost(postData);
      console.log(response);
      toast.success("글이 성공적으로 작성됐어요!");
      router.push("/lost");
    } catch (error) {
      toast.error("글이 작성되지 않았어요");
      console.error("POST 요청이 실패했습니다.", error);
    }
  }, [animalInfo, detail, lostInfo, postLost, reward, router]);

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
          files={files}
          setFiles={setFiles}
        />
      )}

      {/* 아이를 놓쳤을 때의 정보를 알려주세요 */}
      {page === 2 && <LostInfo values={lostInfo} onChange={onChangeLostInfo} />}

      {/* 사례금을 알려주세요 */}
      {page === 3 && (
        <RewardInfo value={reward} onChange={onChangeRewardInfo} />
      )}

      {/* 보다 자세한 내용을 알려주세요 */}
      {page === 4 && (
        <ContentInfo value={detail} onChange={onChangeContentInfo} />
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
          {page < 4 && (
            <button onClick={onClickNextPage} className={styles.next}>
              다음
            </button>
          )}
          {page === 4 && (
            <button onClick={handleComplete} className={styles.next}>
              완료
            </button>
          )}
        </div>
      </footer>
    </main>
  );
}

// image type Blob으로 다시 바꿔줘야함
