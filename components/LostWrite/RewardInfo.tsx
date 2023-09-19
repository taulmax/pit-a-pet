import styles from "@/styles/pages/lostWrite.module.css";
import { useCallback } from "react";

// 천단위로 콤마 넣기
// 아래 한글로도 3456만 3300원 이런식으로도 나오게
export default function RewardInfo() {
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
      <div className={styles.title}>사례금을 알려주세요</div>
      <div className={styles.description}>
        꼭 설정할 필요는 없어요. 부담스러우시다면 다음 버튼을 눌러서
        넘어가주세요.
      </div>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <div className={styles.item_content}>
            <input onFocus={onFocus} onBlur={onBlur} type="text" />
          </div>
        </li>
      </ul>
    </>
  );
}
