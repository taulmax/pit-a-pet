import styles from "@/styles/pages/lostWrite.module.css";
import Input from "../form/Input";
import { ILostInfo } from "@/pages/lostWrite";

export default function LostInfo({
  values: { lostDate, lostPlace },
  onChange,
  tel,
  onChangeTelInfo,
}: {
  values: ILostInfo;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tel: string;
  onChangeTelInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
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
            <Input id="lostDate" value={lostDate} onChange={onChange} />
          </div>
          <div className={styles.short_description}>
            (ex) 9/21 목 8시 30분경 or 2023년 9월 21일 (목) 오후 8:22
          </div>
        </li>
        <li className={styles.list_item}>
          <div className={styles.item_title}>
            아이를 어디서 놓쳤는지 알려주세요
          </div>
          <div className={styles.item_content}>
            <Input id="lostPlace" value={lostPlace} onChange={onChange} />
          </div>
          <div className={styles.short_description}>
            아이를 놓친 장소를 구체적으로 작성해주세요!
          </div>
        </li>
        <li className={styles.list_item}>
          <div className={styles.item_title}>
            보호자분의 전화번호를 알려주세요
          </div>
          <div className={styles.item_content}>
            <Input id="tel" value={tel} onChange={onChangeTelInfo} />
          </div>
        </li>
      </ul>
    </>
  );
}
