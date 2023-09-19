import styles from "@/styles/pages/lostWrite.module.css";
import { useCallback } from "react";

export default function ContentInfo() {
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
      <div className={styles.title}>보다 자세한 내용을 알려주세요</div>
      <div className={styles.description}>
        더 전해주고 싶은 정보가 있다면 알려주세요. 보다 자세한 상황 설명은
        도움이 될거에요.
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
