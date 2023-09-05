import Image from "next/image";
import styles from "@/styles/components/AnimalCard.module.css";
import Link from "next/link";
import { IdleData } from "@/api/introduction";
import { formatDate } from "@/util/util";

export default function AnimalCard({ idleData }: { idleData: IdleData }) {
  return (
    <Link href={`/introduction/${idleData.desertionNo}`}>
      <div className={styles.animal_card}>
        <Image
          className={styles.animal_card_image}
          src={idleData.popfile}
          alt="thumbnail"
          priority={true}
          width={100}
          height={100}
        />
        <div className={styles.tag_list_wrapper}>
          <div className={styles.animal_tag_wrapper}>
            <span
              className={
                idleData.processState === "보호중"
                  ? styles.protected
                  : styles.process_state
              }
            >
              {idleData.processState}
            </span>
            {idleData.sexCd === "M" ? (
              <span className={styles.male}>남자</span>
            ) : idleData.sexCd === "F" ? (
              <span className={styles.female}>여자</span>
            ) : (
              <></>
            )}
          </div>
          <ul className={styles.animal_card_list_wrapper}>
            <li className={styles.animal_card_list}>
              <div className={styles.list_title}>공고기간</div>
              <div className={styles.list_content}>
                {formatDate(idleData.noticeSdt)["yy.mm.dd"]} ~{" "}
                {formatDate(idleData.noticeEdt)["yy.mm.dd"]}
              </div>
            </li>
            <li className={styles.animal_card_list}>
              <div className={styles.list_title}>품종</div>
              <div className={styles.list_content}>{idleData.kindCd}</div>
            </li>
            <li className={styles.animal_card_list}>
              <div className={styles.list_title}>지역</div>
              <div className={styles.list_content}>{idleData.orgNm}</div>
            </li>
            <li className={styles.animal_card_list}>
              <div className={styles.list_title}>발견장소</div>
              <div className={styles.list_content}>{idleData.happenPlace}</div>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
}
