# 엔빵 계산기 빌드업 실행 계획서

> **버전**: v1.1
> **작성일**: 2026-01-27
> **수정일**: 2026-01-27
> **작성자**: CEO Agent
> **승인**: 회장님 (DEC-013)
> **검토**: Board Advisor (approve_with_changes → 반영 완료)

---

## 1. 개요

### 1.1 목적
MVP 완료된 엔빵 계산기의 수익화를 위한 체계적 빌드업

### 1.2 핵심 전략
- **SEO + 바이럴**에 집중 (ROI 최고)
- 카카오 애드핏 + AdSense 병행
- ROI 낮은 기능 제외

### 1.3 목표 KPI (6개월)
| 지표 | 목표 |
|------|------|
| MAU | 500명 |
| 월 수익 | $3-5 |
| 서버비 | $0 (Vercel 무료) |

---

## 2. P0: 즉시 실행 (Week 1)

### 2.1 도메인 연결

**담당**: DevOps Engineer

**작업 내용**:
```
1. Vercel 대시보드 → nbbang 프로젝트 → Settings → Domains
2. nbbang.click 도메인 추가
3. DNS 설정 (네임서버 또는 A/CNAME 레코드)
   - A Record: 76.76.21.21
   - CNAME: cname.vercel-dns.com
4. SSL 인증서 자동 발급 확인
5. www → apex 리다이렉트 설정
```

**완료 기준**:
- [ ] https://nbbang.click 접속 가능
- [ ] https://www.nbbang.click → https://nbbang.click 리다이렉트
- [ ] SSL 인증서 정상

**예상 소요**: 1시간

---

### 2.2 Google Analytics 4 연동

**담당**: DevOps Engineer

**작업 내용**:
```typescript
// 1. GA4 계정 생성 및 측정 ID 획득 (G-XXXXXXXXXX)

// 2. src/app/layout.tsx 수정
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}

// 3. 환경 변수 설정 (.env.local)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**이벤트 트래킹 (추가)**:
```typescript
// src/lib/analytics.ts
export const trackEvent = (action: string, category: string, label?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};

// 추적할 이벤트 (Board Advisor 피드백 반영 - 확장됨):
// 핵심 이벤트:
// - participant_add: 참가자 추가
// - round_add: 차수(라운드) 추가 ← 신규
// - item_add: 비용 항목 추가
// - settlement_calculate: 정산 계산 실행 ← 신규
// - settlement_view: 정산 결과 조회
// 공유 이벤트:
// - share_link_copy: 링크 복사
// - share_kakao: 카카오톡 공유
// - share_web: Web Share API 공유
// 에러 이벤트:
// - error_occurrence: 에러 발생 (type 파라미터 포함) ← 신규
```

**완료 기준**:
- [ ] GA4 실시간 보고서에서 방문자 확인
- [ ] 주요 이벤트 트래킹 동작

**예상 소요**: 2시간

---

### 2.3 개인정보처리방침 페이지

**담당**: Content Writer + Fullstack Dev

**작업 내용**:

1. **페이지 생성**: `src/app/privacy/page.tsx`

```typescript
// src/app/privacy/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | 엔빵 계산기',
  description: '엔빵 계산기의 개인정보처리방침입니다.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">개인정보처리방침</h1>
        {/* Content Writer가 작성한 내용 */}
      </div>
    </div>
  );
}
```

2. **콘텐츠 포함 사항**:
- 수집하는 정보 (없음 - 서버 저장 없음)
- 쿠키 및 분석 도구 (GA4)
- 광고 서비스 (AdSense, 카카오 애드핏)
- 문의처

3. **푸터에 링크 추가**

**완료 기준**:
- [ ] /privacy 페이지 접속 가능
- [ ] 푸터에 개인정보처리방침 링크
- [ ] AdSense 승인 요건 충족

**예상 소요**: 2시간

---

### 2.4 SEO 메타태그 + 구조화 데이터

**담당**: Fullstack Developer

**작업 내용**:

1. **구조화 데이터 추가** (JSON-LD):

```typescript
// src/app/layout.tsx에 추가
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '엔빵 계산기',
  description: '모임이나 회식 후 복잡한 정산을 간편하게! 여러 차수에 걸친 비용을 개인별로 정확하게 계산하고, 최적화된 송금 방법을 제시합니다.',
  url: 'https://nbbang.click',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
  // ⚠️ aggregateRating 제거됨 (Board Advisor 검토)
  // - 실제 사용자 리뷰 없이 가짜 평점 데이터 삽입은 Google 가이드라인 위반
  // - 추후 실제 리뷰 시스템 도입 시 추가 가능
};

// <head>에 추가
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

2. **메타태그 보강**:

```typescript
export const metadata: Metadata = {
  title: '엔빵 계산기 | 회식 정산 더치페이 계산기',
  description: '모임, 회식 후 복잡한 정산을 간편하게! N분의 1이 아닌 진짜 공정한 정산. 여러 차수 비용을 개인별로 계산하고 최적화된 송금 방법 제시.',
  keywords: ['정산 계산기', '엔빵 계산기', '더치페이 계산', '회식비 정산', '모임비 나누기', 'N분의 1 계산기'],
  alternates: {
    canonical: 'https://nbbang.click',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: '엔빵 계산기 | 스마트 정산 솔루션',
    description: '모임, 회식 후 복잡한 정산을 간편하게!',
    url: 'https://nbbang.click',
    siteName: '엔빵 계산기',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://nbbang.click/og-image.png',
        width: 1200,
        height: 630,
        alt: '엔빵 계산기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '엔빵 계산기',
    description: '모임, 회식 후 복잡한 정산을 간편하게!',
    images: ['https://nbbang.click/og-image.png'],
  },
};
```

**완료 기준**:
- [ ] Google Rich Results Test 통과
- [ ] 구조화 데이터 유효성 검사 통과
- [ ] 모든 메타태그 설정

**예상 소요**: 2시간

---

### 2.5 네이버 서치어드바이저 등록

**담당**: DevOps Engineer

**작업 내용**:
```
1. https://searchadvisor.naver.com 접속
2. 사이트 등록: nbbang.click
3. 소유권 확인 (HTML 메타태그 또는 파일)
4. 사이트맵 제출 (P1에서 생성)
5. robots.txt 제출 (P1에서 생성)
```

**HTML 메타태그 방식**:
```typescript
// src/app/layout.tsx <head>에 추가
<meta name="naver-site-verification" content="VERIFICATION_CODE" />
```

**완료 기준**:
- [ ] 네이버 서치어드바이저 소유권 확인
- [ ] 사이트 등록 완료

**예상 소요**: 30분

---

### 2.6 OG 이미지 생성

**담당**: Content Writer (디자인) + DevOps (적용)

**작업 내용**:

1. **OG 이미지 사양**:
   - 크기: 1200 x 630 px
   - 포맷: PNG
   - 파일명: og-image.png
   - 위치: public/og-image.png

2. **디자인 가이드**:
   - 배경: 브랜드 컬러 (파란색 계열)
   - 제목: "엔빵 계산기"
   - 부제: "스마트 정산 솔루션"
   - 아이콘/일러스트: 계산기 또는 돈 분배 이미지
   - SidequestLab 로고

3. **동적 OG 이미지 (옵션)**:
```typescript
// src/app/api/og/route.tsx (Vercel OG)
import { ImageResponse } from 'next/og';

export async function GET() {
  return new ImageResponse(
    (
      <div style={{ /* 스타일 */ }}>
        <h1>엔빵 계산기</h1>
        <p>스마트 정산 솔루션</p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

**완료 기준**:
- [ ] /og-image.png 접근 가능
- [ ] SNS 공유 시 미리보기 이미지 표시
- [ ] Facebook Sharing Debugger 테스트 통과

**예상 소요**: 2시간

---

### 2.7 콘텐츠 페이지 추가 (Board Advisor 신규 권고)

**담당**: Content Writer + Fullstack Dev

**배경**:
- 싱글 페이지 앱(SPA)은 AdSense 승인 거절률이 높음
- 콘텐츠 볼륨 확보를 위해 추가 페이지 필요

**작업 내용**:

1. **서비스 소개 페이지** (`src/app/about/page.tsx`):
```typescript
export const metadata: Metadata = {
  title: '서비스 소개 | 엔빵 계산기',
  description: '엔빵 계산기는 모임, 회식 후 복잡한 정산을 간편하게 해결합니다.',
};

// 포함 내용:
// - 서비스 개요
// - 주요 기능 설명
// - 사용 방법 요약
// - 개발사 소개 (SidequestLab)
```

2. **사용 가이드 페이지** (`src/app/guide/page.tsx`):
```typescript
export const metadata: Metadata = {
  title: '사용 가이드 | 엔빵 계산기',
  description: '엔빵 계산기 사용법을 단계별로 알려드립니다.',
};

// 포함 내용:
// - 참가자 추가 방법
// - 차수별 비용 입력
// - 정산 결과 확인
// - 공유 기능 사용법
// - FAQ
```

3. **sitemap.ts 업데이트**:
```typescript
// 추가할 URL
{ url: 'https://nbbang.click/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
{ url: 'https://nbbang.click/guide', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
```

**완료 기준**:
- [ ] /about 페이지 접속 가능
- [ ] /guide 페이지 접속 가능
- [ ] 각 페이지 최소 500자 이상 콘텐츠
- [ ] sitemap에 추가

**예상 소요**: 3시간

---

## 3. P1: 1주 내 실행 (Week 2)

### 3.1 카카오톡 공유 버튼

**담당**: Fullstack Developer

**작업 내용**:

0. **⚠️ 카카오 개발자 콘솔 보안 설정** (Board Advisor 필수 권고):
```
1. https://developers.kakao.com 접속
2. 내 애플리케이션 → 엔빵 계산기 앱 선택
3. 앱 설정 → 플랫폼 → Web 플랫폼 등록
4. 사이트 도메인: https://nbbang.click
5. ⚠️ 중요: 도메인 제한을 걸어야 App Key 노출 시에도 악용 방지
```

1. **카카오 SDK 설정**:
```typescript
// src/lib/kakao.ts
declare global {
  interface Window {
    Kakao: any;
  }
}

export const initKakao = () => {
  if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
  }
};

export const shareKakao = (url: string, title: string, description: string) => {
  if (typeof window !== 'undefined' && window.Kakao) {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl: 'https://nbbang.click/og-image.png',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '정산 확인하기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  }
};
```

2. **SDK 로드**:
```typescript
// src/app/layout.tsx
<Script
  src="https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js"
  strategy="lazyOnload"
  onLoad={() => initKakao()}
/>
```

3. **버튼 추가** (src/app/page.tsx):
```typescript
const handleKakaoShare = () => {
  const data = exportState();
  const url = `${window.location.origin}?data=${data}`;
  shareKakao(url, '엔빵 계산기 - 정산 공유', '정산 내역을 확인해주세요!');
  trackEvent('share', 'kakao');
};

// 버튼 UI
<button onClick={handleKakaoShare} className="btn btn-kakao">
  <KakaoIcon /> 카카오톡 공유
</button>
```

**완료 기준**:
- [ ] 카카오톡 공유 버튼 동작
- [ ] 공유 시 미리보기 카드 정상 표시
- [ ] GA4 이벤트 트래킹

**예상 소요**: 3시간

---

### 3.2 정산 결과 공유 링크 개선

**담당**: Fullstack Developer

**작업 내용**:

현재 URL 공유 기능이 있으나, **복사 완료 피드백 개선** + **공유 옵션 다양화**

```typescript
// src/components/ShareModal.tsx
export default function ShareModal({ onClose, shareUrl }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    trackEvent('share', 'copy_link');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal">
      <h3>정산 결과 공유</h3>

      {/* 공유 링크 */}
      <div className="share-link-box">
        <input value={shareUrl} readOnly />
        <button onClick={handleCopyLink}>
          {copied ? '복사됨!' : '복사'}
        </button>
      </div>

      {/* 공유 옵션 */}
      <div className="share-options">
        <button onClick={handleKakaoShare}>카카오톡</button>
        <button onClick={handleWebShare}>기타 공유</button>
      </div>
    </div>
  );
}
```

**완료 기준**:
- [ ] 공유 모달 UI 개선
- [ ] 복사 완료 피드백
- [ ] 공유 옵션 다양화

**예상 소요**: 2시간

---

### 3.3 sitemap.xml / robots.txt

**담당**: DevOps Engineer

**작업 내용**:

1. **robots.txt** (public/robots.txt):
```
User-agent: *
Allow: /

Sitemap: https://nbbang.click/sitemap.xml
```

2. **sitemap.xml** (동적 생성):
```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://nbbang.click',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://nbbang.click/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://nbbang.click/guide',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://nbbang.click/privacy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
```

**완료 기준**:
- [ ] /robots.txt 접근 가능
- [ ] /sitemap.xml 접근 가능
- [ ] Google Search Console에 사이트맵 제출
- [ ] 네이버 서치어드바이저에 사이트맵 제출

**예상 소요**: 1시간

---

### 3.4 README.md 개편

**담당**: Content Writer

**작업 내용**:

```markdown
# 엔빵 계산기 (N-ppang Calculator)

> 모임, 회식 후 복잡한 정산을 간편하게! 🧮

[![Deploy](https://img.shields.io/badge/deploy-vercel-black)](https://nbbang.click)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## 📱 스크린샷

[스크린샷 이미지]

## ✨ 주요 기능

- **다차수 정산**: 1차, 2차, 3차 별도 정산 지원
- **선택적 참여**: 일부만 참여한 항목 처리
- **송금 최적화**: 최소 송금 횟수로 정산
- **URL 공유**: 정산 결과를 링크로 공유
- **카카오톡 공유**: 한 번의 클릭으로 카톡 공유

## 🛠 기술 스택

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State**: Zustand
- **Deploy**: Vercel

## 🚀 시작하기

\`\`\`bash
npm install
npm run dev
\`\`\`

## 📄 라이선스

MIT License - SidequestLab
```

**완료 기준**:
- [ ] README 내용 완성
- [ ] 스크린샷 포함
- [ ] 기술 스택 명시

**예상 소요**: 1시간

---

## 4. P2: Week 3-4

### 4.1 카카오 애드핏 신청

**담당**: DevOps Engineer

**작업 내용**:
1. https://adfit.kakao.com 회원가입
2. 매체 등록 (nbbang.click)
3. 광고 단위 생성
4. SDK 연동

### 4.2 AdSense 신청

**담당**: DevOps Engineer

**작업 내용**:
1. Google AdSense 계정 생성
2. 사이트 추가 (nbbang.click)
3. ads.txt 설정
4. 승인 대기 (1-2주)

### 4.3 PWA 구현

**담당**: Fullstack Developer

**작업 내용**:
- manifest.json 생성
- 서비스 워커 설정
- 아이콘 추가 (192x192, 512x512)

### 4.4 다크모드

**담당**: Fullstack Developer

**작업 내용**:
- Tailwind CSS dark mode 설정
- 시스템 설정 연동
- 토글 버튼 추가

---

## 5. 일정 요약

> ⚠️ Board Advisor 피드백: 원안 대비 +9-11시간 과소추정 → 10% 버퍼 반영

```
Week 1 (P0): ~12.5h + 1.5h 버퍼 = ~14h
├── Day 1-2: 도메인 연결(1h), GA4 연동(2h)
├── Day 3-4: 개인정보처리방침(2h), SEO 최적화(2h)
├── Day 4-5: 콘텐츠 페이지 추가(3h) ← 신규
└── Day 5-6: 네이버 등록(0.5h), OG 이미지(2h)

Week 2 (P1): ~7h + 0.5h 버퍼 = ~7.5h
├── Day 1-2: 카카오톡 공유(3h) + 보안 설정 ← 보안 단계 추가
├── Day 3: 공유 링크 개선(2h)
├── Day 4: sitemap/robots.txt(1h)
└── Day 5: README 개편(1h)

Week 3-4 (P2): ~12h + 2h 버퍼 = ~14h
├── 광고 플랫폼 신청(4h)
├── PWA 구현(6-8h) ← 상향 조정
└── 다크모드(2h)
```

**총 예상 소요**: ~35.5시간 (버퍼 포함)

---

## 6. 담당자별 업무 요약

### Fullstack Developer
| 항목 | 우선순위 | 예상 소요 |
|------|----------|----------|
| SEO 구조화 데이터 | P0 | 2h |
| 콘텐츠 페이지 구현 | P0 | 1h |
| 카카오톡 공유 | P1 | 3h |
| 공유 링크 개선 | P1 | 2h |
| PWA | P2 | 6-8h ← Board Advisor 조정 |
| 다크모드 | P2 | 2h |

### DevOps Engineer
| 항목 | 우선순위 | 예상 소요 |
|------|----------|----------|
| 도메인 연결 | P0 | 1h |
| GA4 연동 | P0 | 2h |
| 네이버 서치어드바이저 | P0 | 0.5h |
| OG 이미지 적용 | P0 | 0.5h |
| sitemap/robots.txt | P1 | 1h |
| 광고 플랫폼 연동 | P2 | 4h |

### Content Writer
| 항목 | 우선순위 | 예상 소요 |
|------|----------|----------|
| 개인정보처리방침 | P0 | 1h |
| OG 이미지 디자인 | P0 | 1h |
| 서비스 소개 페이지 (/about) | P0 | 1.5h |
| 사용 가이드 페이지 (/guide) | P0 | 1.5h |
| README 개편 | P1 | 1h |

---

## 7. 검증 체크리스트

### P0 완료 기준
- [ ] https://nbbang.click 접속 가능
- [ ] GA4 실시간 데이터 확인
- [ ] /privacy 페이지 존재
- [ ] /about 페이지 존재 ← 신규
- [ ] /guide 페이지 존재 ← 신규
- [ ] 구조화 데이터 유효성 통과 (aggregateRating 제외 확인)
- [ ] 네이버 서치어드바이저 등록
- [ ] OG 이미지 공유 미리보기 확인

### P1 완료 기준
- [ ] 카카오 개발자 콘솔 도메인 제한 설정 ← 신규 (보안)
- [ ] 카카오톡 공유 동작
- [ ] sitemap.xml 접근 가능 (/about, /guide 포함)
- [ ] Google Search Console 사이트맵 제출
- [ ] README 완성

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| v1.0 | 2026-01-27 | 초안 작성 | CEO Agent |
| v1.1 | 2026-01-27 | Board Advisor 피드백 반영 | CEO Agent |

### v1.1 변경 상세

**Board Advisor 검토 결과 반영**:

1. **필수 수정 (적용 완료)**:
   - JSON-LD `aggregateRating` 제거 (가짜 데이터 → Google 가이드라인 위반)
   - 카카오 도메인 제한 설정 단계 추가 (보안)
   - 일정 버퍼 10% 추가 (과소추정 보정)

2. **권장 수정 (적용 완료)**:
   - GA4 이벤트 확장 (`round_add`, `settlement_calculate`, `error_occurrence`)
   - 콘텐츠 페이지 추가 (`/about`, `/guide`) - AdSense 승인률 향상

3. **시간 조정**:
   - PWA: 4h → 6-8h
   - 총 소요: ~28h → ~35.5h (버퍼 포함)
