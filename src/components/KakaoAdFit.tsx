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
    // layout.tsx의 KakaoAdFitScript가 ba.min.js를 로드하므로
    // 여기서는 스크립트 로드 없이 init()만 호출
    try {
      const win = window as Window & { kakaoAdFit?: { init: () => void } };
      if (win.kakaoAdFit) {
        win.kakaoAdFit.init();
      }
    } catch (error) {
      console.warn('KakaoAdFit init failed:', error);
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
