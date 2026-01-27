/**
 * 카카오 SDK 유틸리티
 *
 * 카카오 SDK 초기화 및 공유 기능 제공
 * JavaScript 앱 키가 없으면 SDK 기능은 비활성화됨
 */

// 환경 변수에서 카카오 앱 키 가져오기
const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || '';

/**
 * 카카오 SDK 초기화 여부 확인
 */
export const isKakaoInitialized = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!window.Kakao?.isInitialized();
};

/**
 * 카카오 SDK 사용 가능 여부 확인
 */
export const isKakaoAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!window.Kakao && !!KAKAO_APP_KEY;
};

/**
 * 카카오 SDK 초기화
 */
export const initKakao = (): boolean => {
  if (typeof window === 'undefined') return false;

  // 앱 키가 없으면 초기화하지 않음
  if (!KAKAO_APP_KEY) {
    console.log('[Kakao] 앱 키가 설정되지 않았습니다. 카카오 공유 기능이 비활성화됩니다.');
    return false;
  }

  // 이미 초기화되어 있으면 스킵
  if (window.Kakao?.isInitialized()) {
    return true;
  }

  try {
    window.Kakao?.init(KAKAO_APP_KEY);
    console.log('[Kakao] SDK 초기화 완료');
    return true;
  } catch (error) {
    console.error('[Kakao] SDK 초기화 실패:', error);
    return false;
  }
};

/**
 * 카카오톡 공유하기 (기본 피드 템플릿)
 */
export interface KakaoShareOptions {
  title: string;
  description: string;
  imageUrl?: string;
  webUrl: string;
  mobileWebUrl?: string;
  buttonTitle?: string;
}

export const shareToKakao = async (options: KakaoShareOptions): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  // SDK가 로드되지 않았으면 초기화 시도
  if (!isKakaoInitialized()) {
    const initialized = initKakao();
    if (!initialized) {
      console.warn('[Kakao] SDK가 초기화되지 않아 공유할 수 없습니다.');
      return false;
    }
  }

  try {
    window.Kakao?.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: options.title,
        description: options.description,
        imageUrl: options.imageUrl || 'https://nbbang.click/api/og',
        link: {
          webUrl: options.webUrl,
          mobileWebUrl: options.mobileWebUrl || options.webUrl,
        },
      },
      buttons: [
        {
          title: options.buttonTitle || '정산 내역 보기',
          link: {
            webUrl: options.webUrl,
            mobileWebUrl: options.mobileWebUrl || options.webUrl,
          },
        },
      ],
    });
    return true;
  } catch (error) {
    console.error('[Kakao] 공유 실패:', error);
    return false;
  }
};

/**
 * 정산 결과 카카오톡 공유 (엔빵 계산기 전용)
 */
export const shareSettlementToKakao = async (shareUrl: string): Promise<boolean> => {
  return shareToKakao({
    title: '엔빵 계산기 - 정산 결과',
    description: '모임 정산 결과를 확인해주세요! 누가 누구에게 얼마를 보내야 하는지 한눈에 볼 수 있어요.',
    webUrl: shareUrl,
    buttonTitle: '정산 내역 보기',
  });
};
