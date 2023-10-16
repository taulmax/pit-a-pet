import MapList from "@/components/map/MapList";
import NaverMap from "@/components/map/NaverMap";
import styles from "@/styles/pages/map.module.css";
import {
  faBuilding,
  faHandHoldingHeart,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Map() {
  return (
    <div className={styles.map_wrapper}>
      <div className={styles.naver_map_wrapper}>
        <NaverMap />
        <ul className={styles.floating_tab}>
          <li>
            <FontAwesomeIcon icon={faStethoscope} color="green" />
            &nbsp; 동물병원
          </li>
          <li>
            <FontAwesomeIcon icon={faHandHoldingHeart} color="red" />
            &nbsp; 동물보호소
          </li>
          <li>
            <FontAwesomeIcon icon={faBuilding} color="grey" />
            &nbsp; 동물등록 대행업체
          </li>
        </ul>
      </div>
      <MapList />
    </div>
  );
}
