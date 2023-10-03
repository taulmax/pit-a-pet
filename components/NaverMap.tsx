// pages/map.tsx
import React, { useEffect } from "react";

export default function NaverMap() {
  const initializeMap = () => {
    const naver = window.naver;
    if (naver) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.978),
        zoom: 10,
      };
      const map = new naver.maps.Map("map", mapOptions);

      // 나머지 지도 초기화 로직 추가
    }
  };

  useEffect(() => {
    if (!window.naver) {
      // 네이버 지도 스크립트 로딩 중...
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      // 이미 로딩되었으면 초기화 진행
      initializeMap();
    }
  }, []);

  return (
    <div>
      <h1>Naver Map</h1>
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
}
