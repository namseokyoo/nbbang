"use client";

import Script from "next/script";

const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || "";

/**
 * 카카오 SDK 스크립트 로더 (Client Component)
 * 앱 키가 설정된 경우에만 SDK를 로드하고 초기화합니다.
 */
export default function KakaoScript() {
  if (!KAKAO_APP_KEY) {
    return null;
  }

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
      integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
      crossOrigin="anonymous"
      strategy="lazyOnload"
      onLoad={() => {
        if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_APP_KEY);
          console.log("[Kakao] SDK initialized");
        }
      }}
    />
  );
}
