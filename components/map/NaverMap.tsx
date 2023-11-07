// pages/map.tsx
import React, { useCallback, useEffect, useState } from "react";
import styles from "@/styles/components/map/NaverMap.module.css";

export default function NaverMap({
  location,
  mapLoading,
}: {
  location: { lat: number; lng: number };
  mapLoading: boolean;
}) {
  const initializeMap = useCallback(() => {
    const naver = window.naver;
    if (naver) {
      const mapOptions = {
        center: new naver.maps.LatLng(location.lat, location.lng),
        zoom: 15,
      };
      const map = new naver.maps.Map("map", mapOptions);

      // 나머지 지도 초기화 로직 추가
    }
  }, [location]);

  useEffect(() => {
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
