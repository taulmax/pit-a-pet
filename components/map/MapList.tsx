import styles from "@/styles/components/map/MapList.module.css";

interface IMapList {
  tab: "동물병원" | "동물보호소" | "동물등록 대행업체";
  placeData: any[];
}

export default function MapList({ tab, placeData }: IMapList) {
  return (
    <div className={styles.info_wrapper}>
      <h1 className={styles.title}>
        주변&nbsp;<span>{tab}</span>&nbsp;검색결과
      </h1>
      <ul className={styles.content_list}>
        {placeData && placeData.length > 0 ? (
          placeData.map((place) => (
            <li key={place.id} className={styles.content}>
              <header>
                <div className={styles.place_name}>{place.place_name}</div>
                {place.distance && <div>{place.distance}m</div>}
              </header>
              {place.road_address_name && (
                <div className={styles.road_address_name}>
                  {place.road_address_name}
                </div>
              )}
              {place.address_name && (
                <div className={styles.address_name}>{place.address_name}</div>
              )}
              {place.phone && <div className={styles.phone}>{place.phone}</div>}
            </li>
          ))
        ) : (
          <li className={styles.content}>검색 결과가 없어요.</li>
        )}
      </ul>
    </div>
  );
}
