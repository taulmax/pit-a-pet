import { formatDate, koreanType } from "@/util/util";
import { useRouter } from "next/router";
import styles from "@/styles/pages/introductionDetail.module.css";
import Image from "next/image";
import { useEffect } from "react";
import { getLostDetail } from "@/api/lost";
import { useGlobalState } from "@/context/GlobalStateContext";
import { useQuery } from "react-query";

export default function LostDetail() {
  const router = useRouter();
  const { id } = router.query;

  // 실종 상세정보 전역상태
  const { lostDetail, setLostDetail } = useGlobalState();

  // React Query를 사용하여 API 데이터를 가져오는 훅을 정의
  const { data, error } = useQuery(
    "LostDetail",
    () => getLostDetail(id as string),
    {
      // 캐시 설정
      enabled: !lostDetail && !!id, // LostDetail이 없을 때만 요청을 보냄
    }
  );

  useEffect(() => {
    if (!lostDetail && data) {
      setLostDetail(data);
    }
  }, [data, setLostDetail, lostDetail]);

  if (!lostDetail) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.introduction_detail_wrapper}>
      <div className={styles.image_wrapper}>
        <Image
          className={styles.animal_image}
          src={lostDetail.images.image1}
          alt="thumbnail"
          priority={true}
          width={500}
          height={500}
        />
      </div>
      <ul className={styles.animal_info_wrapper}>
        <li className={styles.animal_title}>
          [{koreanType(lostDetail.type)}] {lostDetail.petName}
        </li>
        <li className={styles.default_info}>
          {lostDetail.sexCd === "boy" ? (
            <div>남자</div>
          ) : lostDetail.sexCd === "girl" ? (
            <div>여자</div>
          ) : (
            <></>
          )}
          {lostDetail.neuterYn === "Y" ? (
            <div>중성화</div>
          ) : lostDetail.neuterYn === "N" ? (
            <div>중성화 X</div>
          ) : (
            <></>
          )}
          {lostDetail.furColor && <div>{lostDetail.furColor}</div>}
          {lostDetail.age && <div>{lostDetail.age}(살)</div>}
          {lostDetail.weight && <div>{lostDetail.weight}(kg)</div>}
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>실종일자</span>{" "}
          <span className={styles.list_content}>
            {formatDate(lostDetail.lostDate)["yy.mm.dd"]}
          </span>
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>실종 장소</span>{" "}
          <span className={styles.list_content}>{lostDetail.lostPlace}</span>
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>전화번호</span>{" "}
          <span className={styles.list_content}>{lostDetail.tel}</span>
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>사례금</span>{" "}
          <span className={styles.list_content}>
            {lostDetail.reward ? `${lostDetail.reward} ₩` : "X"}
          </span>
        </li>
        <li className={`${styles.animal_info_list} ${styles.block}`}>
          <span className={styles.list_title}>내용</span>{" "}
          <div className={styles.list_content}>{lostDetail.detail}</div>
        </li>
      </ul>
    </div>
  );
}
