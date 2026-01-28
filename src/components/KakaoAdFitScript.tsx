import Script from 'next/script';

/**
 * 카카오 애드핏 스크립트 로더 (Server Component)
 *
 * - 초기 HTML에 스크립트 태그 포함
 * - 크롤러가 광고 스크립트 감지 가능
 * - Next.js Script 컴포넌트 사용으로 최적화
 */
export default function KakaoAdFitScript() {
  return (
    <>
      {/* 카카오 애드핏 스크립트 */}
      <Script
        src="https://t1.daumcdn.net/kas/static/ba.min.js"
        strategy="afterInteractive"
        id="kakao-adfit-script"
      />
    </>
  );
}
