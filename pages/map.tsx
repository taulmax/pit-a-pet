import { getKakaoMap } from "@/api/map";
import MapList from "@/components/map/MapList";
import NaverMap from "@/components/map/NaverMap";
import styles from "@/styles/pages/map.module.css";
import {
  faBuilding,
  faHandHoldingHeart,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

export async function getServerSideProps() {
  const NEXT_KAKAO_REST_API_KEY = process.env.NEXT_KAKAO_REST_API_KEY; // 서버 환경 변수를 가져옴

  return {
    props: { NEXT_KAKAO_REST_API_KEY },
  };
}

export default function Map({
  NEXT_KAKAO_REST_API_KEY,
}: {
  NEXT_KAKAO_REST_API_KEY: string;
}) {
  const [tab, setTab] = useState<
    "동물병원" | "동물보호소" | "동물등록 대행업체"
  >("동물병원");

  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });
  const [mapLoading, setMapLoading] = useState(true);

  // 내 위치 탐색 허용 / 비허용
  useEffect(() => {
    if ("geolocation" in navigator) {
      const timeoutId = setTimeout(() => {
        setMapLoading(false);
      }, 10000); // 10초 동안 대기

      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          clearTimeout(timeoutId); // 내 위치 정보를 받으면 타임아웃 제거
          setLocation({ lat: latitude, lng: longitude });
          setMapLoading(false);
        }
      );
    } else {
      setMapLoading(false);
    }
  }, []);

  // 카카오 API로 동물병원 가져오기
  const kakaoAnimalHospital = useQuery(
    ["kakaoAnimalHospital", tab],
    () => getKakaoMap(tab, location.lat, location.lng, NEXT_KAKAO_REST_API_KEY),
    {
      enabled: !mapLoading,
    }
  );

  const placeData = useMemo(
    () => kakaoAnimalHospital.data?.documents,
    [kakaoAnimalHospital.data?.documents]
  );

  return (
    <div className={styles.map_wrapper}>
      <div className={styles.naver_map_wrapper}>
        {/* 네이버 맵 */}
        <NaverMap
          location={location}
          mapLoading={mapLoading}
          placeData={placeData}
        />

        {/* 플로팅 탭 */}
        <ul className={styles.floating_tab}>
          <li
            className={tab === "동물병원" ? styles.active : ""}
            onClick={() => setTab("동물병원")}
          >
            <FontAwesomeIcon icon={faStethoscope} color="green" />
            &nbsp; 동물병원
          </li>
          <li
            className={tab === "동물보호소" ? styles.active : ""}
            onClick={() => setTab("동물보호소")}
          >
            <FontAwesomeIcon icon={faHandHoldingHeart} color="red" />
            &nbsp; 동물보호소
          </li>
          <li
            className={tab === "동물등록 대행업체" ? styles.active : ""}
            onClick={() => setTab("동물등록 대행업체")}
          >
            <FontAwesomeIcon icon={faBuilding} color="grey" />
            &nbsp; 동물등록 대행업체
          </li>
        </ul>
      </div>
      <MapList tab={tab} placeData={placeData} />
    </div>
  );
}
