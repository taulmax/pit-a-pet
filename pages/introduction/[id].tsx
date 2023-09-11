import { decodeBase64ToUTF8 } from "@/util/util";
import { useRouter } from "next/router";
import styles from "@/styles/pages/introductionDetail.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IdleData } from "@/api/introduction";
import Button from "@/components/Button";

export default function IntroductionDetail() {
  const router = useRouter();
  const { data } = router.query;
  const [decodedData, setDecodedData] = useState<IdleData>();

  useEffect(() => {
    if (data) {
      try {
        const decoded = decodeBase64ToUTF8(data);
        const jsonData = JSON.parse(decoded);
        setDecodedData(jsonData);
      } catch (error) {
        console.error("Error decoding data:", error);
      }
    }
  }, [data]);

  if (!decodedData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.introduction_detail_wrapper}>
      <div className={styles.image_wrapper}>
        <Image
          className={styles.animal_image}
          src={decodedData.popfile}
          alt="thumbnail"
          priority={true}
          width={500}
          height={500}
        />
      </div>
      <ul className={styles.animal_info_wrapper}>
        <li className={styles.animal_title}>
          <span
            className={
              decodedData.processState === "보호중"
                ? styles.protected
                : styles.process_state
            }
          >
            {decodedData.processState}
          </span>
          {decodedData.kindCd}
        </li>
        <li className={styles.default_info}>
          {decodedData.sexCd === "M" ? (
            <div>남자</div>
          ) : decodedData.sexCd === "F" ? (
            <div>여자</div>
          ) : (
            <></>
          )}
          {decodedData.neuterYn === "Y" ? (
            <div>중성화</div>
          ) : decodedData.neuterYn === "N" ? (
            <div>중성화 X</div>
          ) : (
            <></>
          )}
          <div>{decodedData.colorCd}</div>
          <div>{decodedData.age}</div>
          <div>{decodedData.weight}</div>
        </li>

        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>공고번호</span>{" "}
          <span className={styles.list_content}>{decodedData.noticeNo}</span>
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>공고일자</span>{" "}
          <span className={styles.list_content}>
            {decodedData.noticeSdt} ~ {decodedData.noticeEdt}
          </span>
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>특징</span>{" "}
          <span className={styles.list_content}>{decodedData.specialMark}</span>
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>보호소</span>{" "}
          <span className={styles.list_content}>{decodedData.careNm}</span>
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>보호소 주소</span>{" "}
          <span className={styles.list_content}> {decodedData.careAddr}</span>
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>보호소 전화번호</span>{" "}
          <span className={styles.list_content}>{decodedData.careTel}</span>
        </li>
        <li className={styles.button_container}>
          <button className={styles.zzim}>찜하기 ♥</button>
        </li>
      </ul>
    </div>
  );
}
