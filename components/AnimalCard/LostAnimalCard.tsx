import Image from "next/image";
import styles from "@/styles/components/AnimalCard.module.css";
import Link from "next/link";
import { formatDate, koreanType } from "@/util/util";
import { LostData } from "@/api/lost";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function LostAnimalCard({ lostData }: { lostData: LostData }) {
  const { setLostDetail } = useGlobalState();

  return (
    <Link
      href={{
        pathname: `/lost/${lostData.lostNo}`,
      }}
      onClick={() => setLostDetail(lostData)}
    >
      <div className={styles.animal_card}>
        <Image
          className={styles.animal_card_image}
          src={lostData.images.image1}
          alt="thumbnail"
          priority={true}
          width={100}
          height={100}
        />
        <div className={styles.tag_list_wrapper}>
          <div className={styles.animal_tag_wrapper}>
            {lostData.sexCd === "boy" ? (
              <span className={styles.male}>남자</span>
            ) : lostData.sexCd === "girl" ? (
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
              <div className={styles.list_title}>이름</div>
              <div className={styles.list_content}>
                [{koreanType(lostData.type)}] {lostData.petName}
              </div>
            </li>
            <li className={styles.animal_card_list}>
              <div className={styles.list_title}>실종지역</div>
              <div className={styles.list_content}>{lostData.lostPlace}</div>
            </li>
            <li className={styles.animal_card_list}>
              <div className={styles.list_title}>보상</div>
              <div className={styles.list_content}>
                {lostData.reward ? `${lostData.reward} ₩` : "X"}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
}
