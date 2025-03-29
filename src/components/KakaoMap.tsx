import { useEffect, useRef } from 'react';
import { loadKakaoMap } from '@/utils/loadKakaoMap';

interface Props {
  latitude: number;
  longitude: number;
}

const KakaoMap = ({ latitude, longitude }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      // Kakao 지도 SDK 동적 로딩
      await loadKakaoMap();

      // SDK가 제대로 로딩되지 않았거나 DOM 참조가 없을 경우 중단
      if (!window.kakao || !window.kakao.maps || !mapRef.current) {
        console.error('Kakao 지도 SDK가 정상적으로 로딩되지 않았습니다.');
        return;
      }

      // 사용자의 현재 위치 기준 중심 좌표 생성
      const center = new window.kakao.maps.LatLng(latitude, longitude);

      // 지도 생성
      const map = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 3,
      });

      // 현재 위치 마커 추가
      new window.kakao.maps.Marker({
        map,
        position: center,
      });

      // 반경 1km 원형 표시
      new window.kakao.maps.Circle({
        map,
        center,
        radius: 1000,
        strokeWeight: 2,
        strokeColor: '#FF5A5A',
        strokeOpacity: 0.8,
        fillColor: '#FFBABA',
        fillOpacity: 0.3,
      });
    };

    initMap();
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default KakaoMap;