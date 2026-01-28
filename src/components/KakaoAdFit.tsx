'use client';

import { useEffect } from 'react';

interface KakaoAdFitProps {
  /** 광고 단위 ID (DAN-xxxxx 형식) */
  adUnitId: string;
  /** 광고 너비 (기본값: 320) */
  width?: number;
  /** 광고 높이 (기본값: 100) */
  height?: number;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 카카오 애드핏 광고 컴포넌트
 * - Next.js App Router 호환 (Client Component)
 * - 초기 HTML에 광고 마크업 포함 (SSR 친화적)
 * - 광고 스크립트 동적 로딩
 * - 스크립트 중복 로딩 방지
 */
export default function KakaoAdFit({
  adUnitId,
  width = 320,
  height = 100,
  className = '',
}: KakaoAdFitProps) {
  useEffect(() => {
    // 스크립트가 이미 로드되었는지 확인
    const existingScript = document.querySelector(
      'script[src*="t1.daumcdn.net/kas/static/ba.min.js"]'
    );

    if (!existingScript) {
      // 스크립트 로드
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      // 이미 스크립트가 있으면 광고 다시 렌더링
      const win = window as Window & { kakaoAdFit?: { init: () => void } };
      if (win.kakaoAdFit) {
        win.kakaoAdFit.init();
      }
    }
  }, []);

  return (
    <div
      className={`kakao-adfit-container flex justify-center items-center ${className}`}
      style={{ minHeight: height }}
      aria-label="광고"
    >
      {/* 초기 HTML에 광고 마크업 포함 (SSR 친화적) */}
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit={adUnitId}
        data-ad-width={width.toString()}
        data-ad-height={height.toString()}
      />
    </div>
  );
}
