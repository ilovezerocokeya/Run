// 전역 스코프에 타입 선언을 추가하기 위한 export 문
export {};

// 전역(global) 객체 확장을 위한 선언
declare global {
  // window 객체에 kakao 속성을 추가
  interface Window {
    kakao: {
      maps: typeof kakao.maps;
    };
  }

  // kakao.maps 네임스페이스 선언
  namespace kakao.maps {
    // Kakao 지도 SDK가 로딩된 후 콜백을 실행하는 함수
    function load(callback: () => void): void;

    // 지도 좌표를 표현하는 클래스
    class LatLng {
      constructor(latitude: number, longitude: number);
      getLat(): number;
      getLng(): number;
    }

    // 지도 생성 시 사용되는 옵션 인터페이스
    interface MapOptions {
      center: LatLng; // 중심 좌표
      level: number;  // 확대/축소 레벨 (1 ~ 14)
    }

    // 지도를 생성하고 제어하는 클래스
    class Map {
      constructor(container: HTMLElement, options: MapOptions);
      setCenter(latlng: LatLng): void; // 지도 중심 이동
    }

    // 마커 생성 시 사용되는 옵션 인터페이스
    interface MarkerOptions {
      map: Map;         // 표시할 지도 인스턴스
      position: LatLng; // 마커 위치
    }

    // 지도 위에 마커를 생성하는 클래스
    class Marker {
      constructor(options: MarkerOptions);
    }

    // 원(circle) 생성 시 사용되는 옵션 인터페이스
    interface CircleOptions {
      map: Map;         
      center: LatLng;   
      radius: number;   
      strokeWeight?: number;     // 테두리 두께
      strokeColor?: string;      // 테두리 색상
      strokeOpacity?: number;    // 테두리 투명도
      fillColor?: string;        // 내부 채우기 색상
      fillOpacity?: number;      // 내부 투명도
    }

    // 지도 위에 원(circle)을 그리는 클래스
    class Circle {
      constructor(options: CircleOptions);
    }
  }
}