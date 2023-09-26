import styles from "@/styles/pages/lostWrite.module.css";
import Input from "../form/Input";
import { numberToKoreanAmount } from "@/util/util";

// 천단위로 콤마 넣기
// 아래 한글로도 3456만 3300원 이런식으로도 나오게
export default function RewardInfo({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
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
            <Input suffix="₩" value={value} onChange={onChange} />
          </div>
          <div className={styles.short_description}>
            {value &&
              `(${numberToKoreanAmount(value.replace(/[^0-9]/g, ""))}원)`}
          </div>
        </li>
      </ul>
    </>
  );
}
