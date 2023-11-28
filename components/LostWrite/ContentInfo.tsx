import styles from "@/styles/pages/lostWrite.module.css";
import Textarea from "../form/Textarea";
import Input from "../form/Input";

// textarea로 바꾸기
export default function ContentInfo({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
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
            <Textarea value={value} onChange={onChange} maxLength={500} />
          </div>
        </li>
      </ul>
    </>
  );
}
