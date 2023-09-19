import styles from "@/styles/pages/lostWrite.module.css";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCat,
  faDog,
  faEllipsis,
  faMars,
  faQuestion,
  faVenus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

type animalType = "dog" | "cat" | "rest"; // 품종
type animalSex = "boy" | "girl" | "unknown"; // 성별
type animalNeutered = "Y" | "N" | "U"; // 중성화

export default function AnimalInfo() {
  const [type, setType] = useState<animalType | null>(null); // 품종
  const [sex, setSex] = useState<animalSex | null>(null); // 성별
  const [neutered, setNeutered] = useState<animalNeutered | null>(null); // 중성화

  // 아이콘 버튼 클릭 이벤트
  function onClickIconButton<T>(
    e: React.MouseEvent<HTMLDivElement>,
    setState: Dispatch<SetStateAction<T | null>>
  ) {
    const clicked = e.currentTarget.dataset.type as T;
    if (type === clicked) {
      setState(null);
    } else {
      setState(clicked);
    }
  }

  // Input Focus Event
  const onFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.add(styles.active);
  }, []);

  // Input Blur Event
  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.remove(styles.active);
  }, []);

  return (
    <>
      <div className={styles.title}>아이의 정보를 알려주세요</div>
      <div className={styles.description}>
        아이의 정보가 정확할수록 효과적입니다. 아이를 잘 알아볼 수 있는 정보를
        기재해주세요.
      </div>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <div className={styles.item_title}>품종을 알려주세요</div>
          <div
            className={`${styles.item_content} ${styles.icon_button_wrapper}`}
          >
            <div
              onClick={(e) => onClickIconButton<animalType>(e, setType)}
              data-type="dog"
              className={`${styles.icon_button} ${
                type === "dog" ? styles.active : ""
              }`}
            >
              <FontAwesomeIcon icon={faDog} />
              <span>개</span>
            </div>
            <div
              onClick={(e) => onClickIconButton<animalType>(e, setType)}
              data-type="cat"
              className={`${styles.icon_button} ${
                type === "cat" ? styles.active : ""
              }`}
            >
              <FontAwesomeIcon icon={faCat} />
              <span>고양이</span>
            </div>
            <div
              onClick={(e) => onClickIconButton<animalType>(e, setType)}
              data-type="rest"
              className={`${styles.icon_button} ${
                type === "rest" ? styles.active : ""
              }`}
            >
              <FontAwesomeIcon icon={faEllipsis} />
              <span>기타</span>
            </div>
          </div>
        </li>
        <li className={styles.list_item}>
          <div className={styles.item_title}>성별을 알려주세요</div>
          <div className={styles.item_content}>
            <div
              className={`${styles.item_content} ${styles.icon_button_wrapper}`}
            >
              <div
                onClick={(e) => onClickIconButton<animalSex>(e, setSex)}
                data-type="boy"
                className={`${styles.icon_button} ${
                  sex === "boy" ? styles.active : ""
                }`}
              >
                <FontAwesomeIcon icon={faMars} />
                <span>남자</span>
              </div>
              <div
                onClick={(e) => onClickIconButton<animalSex>(e, setSex)}
                data-type="girl"
                className={`${styles.icon_button} ${
                  sex === "girl" ? styles.active : ""
                }`}
              >
                <FontAwesomeIcon icon={faVenus} />
                <span>여자</span>
              </div>
              <div
                onClick={(e) => onClickIconButton<animalSex>(e, setSex)}
                data-type="unknown"
                className={`${styles.icon_button} ${
                  sex === "unknown" ? styles.active : ""
                }`}
              >
                <FontAwesomeIcon icon={faQuestion} />
                <span>모르겠어요</span>
              </div>
            </div>
          </div>
        </li>
        <li className={styles.list_item}>
          <div className={styles.item_title}>중성화 여부를 알려주세요</div>
          <div className={styles.item_content}>
            <div
              className={`${styles.item_content} ${styles.icon_button_wrapper}`}
            >
              <div
                onClick={(e) =>
                  onClickIconButton<animalNeutered>(e, setNeutered)
                }
                data-type="Y"
                className={`${styles.icon_button} ${
                  neutered === "Y" ? styles.active : ""
                }`}
              >
                <FontAwesomeIcon icon={faCircle} />
                <span>했어요</span>
              </div>
              <div
                onClick={(e) =>
                  onClickIconButton<animalNeutered>(e, setNeutered)
                }
                data-type="N"
                className={`${styles.icon_button} ${
                  neutered === "N" ? styles.active : ""
                }`}
              >
                <FontAwesomeIcon icon={faX} />
                <span>안했어요</span>
              </div>
              <div
                onClick={(e) =>
                  onClickIconButton<animalNeutered>(e, setNeutered)
                }
                data-type="U"
                className={`${styles.icon_button} ${
                  neutered === "U" ? styles.active : ""
                }`}
              >
                <FontAwesomeIcon icon={faQuestion} />
                <span>모르겠어요</span>
              </div>
            </div>
          </div>
        </li>
        <li className={styles.list_item}>
          <div className={styles.item_title}>아이 이름을 알려주세요</div>
          <div className={styles.item_content}>
            <input onFocus={onFocus} onBlur={onBlur} type="text" />
          </div>
        </li>
        <li className={styles.list_item}>
          <div className={styles.item_title}>나이를 알려주세요</div>
          <div className={styles.item_content}>
            <input onFocus={onFocus} onBlur={onBlur} type="text" />
          </div>
          <div className={styles.short_description}>
            아직 돌이 지나지 않았다면 몇 개월인지, 지났다면 몇 살인지 정확하게
            써주세요!
          </div>
        </li>
        <li className={styles.list_item}>
          <div className={styles.item_title}>몸무게를 알려주세요</div>
          <div className={styles.item_content}>
            <input onFocus={onFocus} onBlur={onBlur} type="text" />
          </div>
          <div className={styles.short_description}>
            자세히 모른다면 추정 몸무게라도 알려주신다면 도움이 될거에요!
          </div>
        </li>
        <li className={styles.list_item}>
          <div className={styles.item_title}>털색을 알려주세요</div>
          <div className={styles.item_content}>
            <input onFocus={onFocus} onBlur={onBlur} type="text" />
          </div>
        </li>
        <li className={styles.list_item}>
          <div className={styles.item_title}>특징을 알려주세요</div>
          <div className={styles.item_content}>
            <input onFocus={onFocus} onBlur={onBlur} type="text" />
          </div>
          <div className={styles.short_description}>
            뒤에서 내용을 자세하게 쓸 수 있어요. 여기선 너무 자세하게 적지
            않아도 괜찮아요!
          </div>
        </li>
        <li className={styles.list_item}>
          <div className={styles.item_title}>사진을 업로드해 주세요</div>
          <div className={styles.short_description}>
            사진은 5장까지 올릴 수 있어요. 최대한 많은 사진을 올려주세요!
          </div>
          <div className={styles.item_content}></div>
        </li>
      </ul>
    </>
  );
}
