/**
 * Google Analytics 4 이벤트 트래킹 유틸리티
 */

// GA4 이벤트 타입 정의
type GAEventParams = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
};

// gtag 타입 확장
declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set",
      targetId: string,
      params?: GAEventParams
    ) => void;
  }
}

/**
 * GA4 이벤트 전송
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// ============================================
// 정의된 이벤트 함수들 (Board Advisor 피드백 반영)
// ============================================

/**
 * 참가자 추가 이벤트
 */
export const trackParticipantAdd = (participantCount: number) => {
  trackEvent("participant_add", "engagement", undefined, participantCount);
};

/**
 * 차수(라운드) 추가 이벤트
 */
export const trackRoundAdd = (roundNumber: number) => {
  trackEvent("round_add", "engagement", `round_${roundNumber}`, roundNumber);
};

/**
 * 비용 항목 추가 이벤트
 */
export const trackItemAdd = (roundNumber: number) => {
  trackEvent("item_add", "engagement", `round_${roundNumber}`);
};

/**
 * 정산 계산 실행 이벤트
 */
export const trackSettlementCalculate = (participantCount: number, roundCount: number) => {
  trackEvent("settlement_calculate", "conversion", `p${participantCount}_r${roundCount}`);
};

/**
 * 정산 결과 조회 이벤트
 */
export const trackSettlementView = () => {
  trackEvent("settlement_view", "engagement");
};

/**
 * 링크 복사 이벤트
 */
export const trackShareLinkCopy = () => {
  trackEvent("share_link_copy", "share");
};

/**
 * 카카오톡 공유 이벤트
 */
export const trackShareKakao = () => {
  trackEvent("share_kakao", "share");
};

/**
 * Web Share API 공유 이벤트
 */
export const trackShareWeb = () => {
  trackEvent("share_web", "share");
};

/**
 * 에러 발생 이벤트
 */
export const trackError = (errorType: string, errorMessage?: string) => {
  trackEvent("error_occurrence", "error", errorType);

  // 콘솔에도 로깅 (디버깅용)
  if (process.env.NODE_ENV === "development") {
    console.error(`[Analytics Error] ${errorType}: ${errorMessage}`);
  }
};

/**
 * 페이지 뷰 이벤트 (SPA 네비게이션용)
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};
