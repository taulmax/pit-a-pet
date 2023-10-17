import { decodeBase64ToUTF8, formatDate } from "@/util/util";
import { useRouter } from "next/router";
import styles from "@/styles/pages/introductionDetail.module.css";
import Image from "next/image";
import { useEffect } from "react";
import { getIdleDetail } from "@/api/introduction";
import { useGlobalState } from "@/context/GlobalStateContext";
import { useQuery } from "react-query";

export default function IntroductionDetail() {
  const router = useRouter();
  const { id } = router.query;

  // 아이들 상세정보 전역상태
  const { idleDetail, setIdleDetail } = useGlobalState();

  // React Query를 사용하여 API 데이터를 가져오는 훅을 정의
  const { data, error } = useQuery(
    "idleDetail",
    () => getIdleDetail(id as string),
    {
      // 캐시 설정
      enabled: !idleDetail, // idleDetail이 없을 때만 요청을 보냄
    }
  );

  useEffect(() => {
    if (!idleDetail && data) {
      setIdleDetail(data);
    }
  }, [data, idleDetail, setIdleDetail]);

  if (!idleDetail) {
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
          src={idleDetail.popfile}
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
              idleDetail.processState === "보호중"
                ? styles.protected
                : styles.process_state
            }
          >
            {idleDetail.processState}
          </span>
          {idleDetail.kindCd}
        </li>
        <li className={styles.default_info}>
          {idleDetail.sexCd === "M" ? (
            <div>남자</div>
          ) : idleDetail.sexCd === "F" ? (
            <div>여자</div>
          ) : (
            <></>
          )}
          {idleDetail.neuterYn === "Y" ? (
            <div>중성화</div>
          ) : idleDetail.neuterYn === "N" ? (
            <div>중성화 X</div>
          ) : (
            <></>
          )}
          <div>{idleDetail.colorCd}</div>
          <div>{idleDetail.age}</div>
          <div>{idleDetail.weight}</div>
        </li>

        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>공고번호</span>{" "}
          <span className={styles.list_content}>{idleDetail.noticeNo}</span>
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>공고일자</span>{" "}
          <span className={styles.list_content}>
            {formatDate(idleDetail.noticeSdt)["yy.mm.dd"]} ~{" "}
            {formatDate(idleDetail.noticeEdt)["yy.mm.dd"]}
          </span>
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>특징</span>{" "}
          <span className={styles.list_content}>{idleDetail.specialMark}</span>
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>보호소</span>{" "}
          <span className={styles.list_content}>{idleDetail.careNm}</span>
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>보호소 주소</span>{" "}
          <span className={styles.list_content}> {idleDetail.careAddr}</span>
        </li>
        <li className={styles.animal_info_list}>
          <span className={styles.list_title}>보호소 전화번호</span>{" "}
          <span className={styles.list_content}>{idleDetail.careTel}</span>
        </li>
        <li className={styles.button_container}>
          <button className={styles.zzim}>찜하기 ♥</button>
        </li>
      </ul>
    </div>
  );
}
