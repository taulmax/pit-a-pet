import Image from "next/image";
import styles from "@/styles/components/AnimalCard.module.css";

export default function AnimalCard() {
  return (
    <div className={styles.animal_card}>
      <Image
        className={styles.animal_card_image}
        src="/img/test.png"
        alt="테스트"
        priority={true}
        width={100}
        height={100}
      />
      <ul className={styles.animal_card_list_wrapper}>
        <li className={styles.animal_card_list}>
          <div className={styles.list_title}>공고기간</div>
          <div className={styles.list_content}>23.09.03 ~ 23.09.13</div>
        </li>
        <li className={styles.animal_card_list}>
          <div className={styles.list_title}>품종</div>
          <div className={styles.list_content}>[사람] 우정잉</div>
        </li>
        <li className={styles.animal_card_list}>
          <div className={styles.list_title}>지역</div>
          <div className={styles.list_content}>유튜브와 트위치</div>
        </li>
        <li className={styles.animal_card_list}>
          <div className={styles.list_title}>구조장소</div>
          <div className={styles.list_content}>유튜브와 트위치</div>
        </li>
      </ul>
    </div>
  );
}
