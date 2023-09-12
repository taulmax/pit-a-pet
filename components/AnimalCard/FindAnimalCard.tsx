import Image from "next/image";
import styles from "@/styles/components/AnimalCard.module.css";
import Link from "next/link";
import { IdleData } from "@/api/introduction";
import { encodeDataToBase64, formatDate } from "@/util/util";
import { LostData } from "@/api/lost";

export default function LostAnimalCard({ lostData }: { lostData: LostData }) {
  return (
    <Link
      href={{
        pathname: `/lost/${lostData.lostNo}`,
        query: { data: encodeDataToBase64(lostData) },
      }}
    >
      <div className={styles.animal_card}>
        <Image
          className={styles.animal_card_image}
          src={lostData.image}
          alt="thumbnail"
          priority={true}
          width={100}
          height={100}
        />
        <div className={styles.tag_list_wrapper}>
          <div className={styles.animal_tag_wrapper}>
            {/* <span
              className={
                lostData.processState === "보호중"
                  ? styles.protected
                  : styles.process_state
              }
            >
              {lostData.processState}
            </span> */}
            {lostData.sexCd === "수컷" ? (
              <span className={styles.male}>남자</span>
            ) : lostData.sexCd === "암컷" ? (
              <span className={styles.female}>여자</span>
            ) : (
              <></>
            )}
          </div>
          <ul className={styles.animal_card_list_wrapper}>
            <li className={styles.animal_card_list}>
              <div className={styles.list_title}>실종일</div>
              <div className={styles.list_content}>
                {formatDate(lostData.lostDate)["yy.mm.dd"]}
              </div>
            </li>
            <li className={styles.animal_card_list}>
              <div className={styles.list_title}>품종</div>
              <div className={styles.list_content}>{lostData.type}</div>
            </li>
            <li className={styles.animal_card_list}>
              <div className={styles.list_title}>실종지역</div>
              <div className={styles.list_content}>{lostData.lostPlace}</div>
            </li>
            <li className={styles.animal_card_list}>
              <div className={styles.list_title}>보상</div>
              <div className={styles.list_content}>{lostData.reward}</div>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
}
