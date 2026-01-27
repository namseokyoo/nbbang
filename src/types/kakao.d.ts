/**
 * 카카오 SDK 타입 정의
 * 참고: https://developers.kakao.com/docs/latest/ko/message/js-link
 */

declare global {
  interface Window {
    Kakao?: KakaoSDK;
  }
}

interface KakaoSDK {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  cleanup: () => void;
  Share: KakaoShare;
}

interface KakaoShare {
  sendDefault: (settings: KakaoShareSettings) => void;
  sendCustom: (settings: KakaoShareCustomSettings) => void;
}

interface KakaoShareSettings {
  objectType: 'feed' | 'list' | 'commerce' | 'location' | 'text';
  content?: KakaoContentObject;
  itemContent?: KakaoItemContentObject;
  social?: KakaoSocialObject;
  buttons?: KakaoButtonObject[];
  buttonTitle?: string;
}

interface KakaoShareCustomSettings {
  templateId: number;
  templateArgs?: Record<string, string>;
}

interface KakaoContentObject {
  title: string;
  description?: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  link: KakaoLinkObject;
}

interface KakaoItemContentObject {
  profileText?: string;
  profileImageUrl?: string;
  titleImageText?: string;
  titleImageUrl?: string;
  titleImageCategory?: string;
  items?: KakaoItemObject[];
  sum?: string;
  sumOp?: string;
}

interface KakaoItemObject {
  item: string;
  itemOp: string;
}

interface KakaoSocialObject {
  likeCount?: number;
  commentCount?: number;
  sharedCount?: number;
  viewCount?: number;
  subscriberCount?: number;
}

interface KakaoLinkObject {
  webUrl?: string;
  mobileWebUrl?: string;
  androidExecutionParams?: string;
  iosExecutionParams?: string;
}

interface KakaoButtonObject {
  title: string;
  link: KakaoLinkObject;
}

export {};
