'use client';

import { useEffect, useRef } from 'react';

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
 * - useRef로 wrapper div 참조, 그 안에 스크립트 추가 (DOM 위치 보장)
 * - ba.min.js는 로드 시 DOM의 ins.kakao_ad_area 태그를 자동 스캔
 * - ins 태그가 먼저 렌더된 후 스크립트를 추가하여 정상 동작 보장
 * - 언마운트 시 window.adfit.destroy()로 정리
 */
export default function KakaoAdFit({
  adUnitId,
  width = 320,
  height = 100,
  className = '',
}: KakaoAdFitProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
    script.async = true;
    script.charset = 'utf-8';
    containerRef.current.appendChild(script);

    return () => {
      try {
        const win = window as Window & { adfit?: { destroy: (id: string) => void } };
        if (win.adfit) {
          win.adfit.destroy(adUnitId);
        }
      } catch {
        // ignore cleanup errors
      }
    };
  }, [adUnitId]);

  return (
    <div
      ref={containerRef}
      className={`kakao-adfit-container flex justify-center items-center ${className}`}
      style={{ minHeight: height }}
      aria-label="광고"
    >
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
