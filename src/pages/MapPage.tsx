import { useEffect, useState } from 'react';
import KakaoMap from '@/components/KakaoMap';

const MapPage = () => {
  // 사용자 위치를 저장할 상태
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // 위치 정보를 가져오는 함수
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          // 위치 상태 업데이트
          setLocation({ lat: latitude, lng: longitude });
        },
        () => {
          // 위치 권한이 거부된 경우 사용자에게 알림
          alert('위치 권한이 필요합니다.');
        }
      );
    };

    fetchLocation(); // 컴포넌트 마운트 시 위치 요청
  }, []);

  // 위치 정보를 아직 받아오지 못한 경우 로딩 메시지 출력
  if (!location) return <div>위치 정보를 불러오는 중...</div>;

  // 위치 정보를 전달하여 KakaoMap 컴포넌트 렌더링
  return <KakaoMap latitude={location.lat} longitude={location.lng} />;
};

export default MapPage;