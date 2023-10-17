import MapList from "@/components/map/MapList";
import NaverMap from "@/components/map/NaverMap";
import styles from "@/styles/pages/map.module.css";
import {
  faBuilding,
  faHandHoldingHeart,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Map() {
  const [tab, setTab] = useState<
    "동물병원" | "동물보호소" | "동물등록 대행업체"
  >("동물병원");
  return (
    <div className={styles.map_wrapper}>
      <div className={styles.naver_map_wrapper}>
        <NaverMap />
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
      <MapList tab={tab} />
    </div>
  );
}
