import styles from "@/styles/components/map/MapList.module.css";

interface IMapList {
  tab: "동물병원" | "동물보호소" | "동물등록 대행업체";
}

export default function MapList({ tab }: IMapList) {
  return (
    <div className={styles.info_wrapper}>
      <h1 className={styles.title}>
        주변&nbsp;<span>{tab}</span>&nbsp;검색결과
      </h1>
      <ul className={styles.content_list}>
        <li className={styles.content}></li>
      </ul>
    </div>
  );
}
