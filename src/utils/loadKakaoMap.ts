const loadKakaoMap = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 이미 Kakao 지도 스크립트가 추가되어 있다면 중복 로딩 방지
    if (document.getElementById('kakao-map-script')) {
      resolve();
      return;
    }

    // Kakao 지도 SDK 스크립트 엘리먼트 생성
    const script = document.createElement('script');
    script.id = 'kakao-map-script';

    // 환경 변수에서 Kakao API 키를 불러와 URL 구성
    const key = import.meta.env.VITE_KAKAO_KEY;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;

    // 스크립트 로드 완료 후 kakao.maps.load() 호출
    script.onload = () => {
      window.kakao.maps.load(() => {
        resolve();
      });
    };

    // 스크립트 로딩 실패 시 reject
    script.onerror = reject;

    // <head>에 스크립트 삽입
    document.head.appendChild(script);
  });
};

export { loadKakaoMap };