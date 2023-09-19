import styles from "@/styles/pages/lostWrite.module.css";
import { useCallback } from "react";

export default function LostInfo() {
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
      <div className={styles.title}>아이를 놓쳤을 때의 정보를 알려주세요</div>
      <div className={styles.description}>
        장소에 대한 정보가 잘 생각나지 않더라도, 최대한 자세하게 알려주세요.
      </div>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <div className={styles.item_title}>
            아이를 언제 놓쳤는지 알려주세요
          </div>
          <div className={styles.item_content}>
            <input onFocus={onFocus} onBlur={onBlur} type="text" />
          </div>
        </li>
        <li className={styles.list_item}>
          <div className={styles.item_title}>
            아이를 어디서 놓쳤는지 알려주세요
          </div>
          <div className={styles.item_content}>
            <input onFocus={onFocus} onBlur={onBlur} type="text" />
          </div>
          <div className={styles.short_description}>
            아이를 놓친 장소를 구체적으로 작성해주세요!
          </div>
        </li>
      </ul>
    </>
  );
}
