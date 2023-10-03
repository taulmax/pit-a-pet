// pages/map.tsx
import React, { useCallback, useEffect, useState } from "react";

export default function NaverMap() {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });
  const [loading, setLoading] = useState(true);

  // 내 위치 탐색 허용 / 비허용
  useEffect(() => {
    if ("geolocation" in navigator) {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 10000); // 10초 동안 대기

      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          clearTimeout(timeoutId); // 내 위치 정보를 받으면 타임아웃 제거
          setLocation({ lat: latitude, lng: longitude });
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

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
    <div>
      <h1>Naver Map</h1>
      <div
        id="map"
        style={{
          width: "100%",
          height: "500px",
          filter: loading ? "blur(5px)" : "none", // 로딩 중일 때 블러 처리
        }}
      ></div>
      {loading && <p>Loading...</p>}
    </div>
  );
}
