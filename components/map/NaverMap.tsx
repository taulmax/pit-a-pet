// pages/map.tsx
import React, { useCallback, useEffect, useState } from "react";
import styles from "@/styles/components/map/NaverMap.module.css";
import { CURRENT_LOCATION_MARKER, PLACE_LOCATION_MARKER } from "@/util/data";

export default function NaverMap({
  location,
  mapLoading,
  placeData,
}: {
  location: { lat: number; lng: number };
  mapLoading: boolean;
  placeData: any[];
}) {
  const initializeMap = useCallback(() => {
    const naver = window.naver;
    if (naver) {
      const mapOptions = {
        center: new naver.maps.LatLng(location.lat, location.lng),
        zoom: 15,
      };
      const map = new naver.maps.Map("map", mapOptions);

      let marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(location.lat, location.lng),
        map: map,
        icon: {
          content: CURRENT_LOCATION_MARKER(),
          anchor: new naver.maps.Point(15, 15), // 이미지의 중심 지점 설정
        },
      });

      // placeData에 있는 위경도 배열을 사용하여 마커를 생성하고 지도에 추가
      if (placeData && placeData.length > 0) {
        placeData.forEach((place) => {
          const placeMarker = new naver.maps.Marker({
            position: new naver.maps.LatLng(place.y, place.x),
            map: map,
            icon: {
              content: PLACE_LOCATION_MARKER(place.place_name),
              anchor: new naver.maps.Point(15, 15), // 이미지의 중심 지점 설정
            },
          });
        });
      }
    }
  }, [location, placeData]);

  useEffect(() => {
    console.log(!!window.naver);
    if (!window.naver) {
      // 네이버 지도 스크립트 로딩
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      // 이미 로딩되었으면 초기화 진행
      initializeMap();
    }
  }, [initializeMap]);

  useEffect(() => {
    console.log(placeData);
  }, [placeData]);

  return (
    <div
      id="map"
      className={styles.map}
      style={{
        filter: mapLoading ? "blur(5px)" : "none", // 로딩 중일 때 블러 처리
      }}
    ></div>
  );
}
