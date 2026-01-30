# 엔빵 계산기 기술 변경 로그

> 프로젝트의 주요 기술적 변경사항을 기록합니다.

---

## 2026-01-28: 카카오 애드핏 승인을 위한 SSR 전환

### 배경
- **문제**: 카카오 애드핏 신청이 "매체에 접근할 수 없어 보류되었습니다" 에러로 거부
- **원인**: Client-Side Rendering(CSR) 환경에서 카카오 크롤러가 JavaScript를 실행하지 못해 광고 스크립트 확인 불가

### 기술적 분석

#### 초기 구조 (CSR)
```typescript
// app/layout.tsx (Client Component)
'use client';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script async src="https://t1.daumcdn.net/kas/static/ba.min.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**문제점**:
- 광고 스크립트가 Client-side에서만 로드
- 카카오 크롤러는 JavaScript 미실행 → 광고 코드 확인 불가
- 초기 HTML에 광고 스크립트 미포함

#### 변경된 구조 (SSR)

**1. Server Component 생성**
```typescript
// components/KakaoAdFitScript.tsx
export default function KakaoAdFitScript() {
  return (
    <script
      async
      src="https://t1.daumcdn.net/kas/static/ba.min.js"
    />
  );
}
```

**2. Layout 적용**
```typescript
// app/layout.tsx
import KakaoAdFitScript from '@/components/KakaoAdFitScript';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <KakaoAdFitScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 변경 사항

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| **렌더링 방식** | Client-Side Rendering | Server-Side Rendering |
| **스크립트 위치** | `<head>` 직접 삽입 | Server Component 분리 |
| **크롤러 확인** | ❌ 불가능 | ✅ 가능 |
| **초기 HTML 포함** | ❌ 미포함 | ✅ 포함 |

### 기술 스택
- **Framework**: Next.js 15 (App Router)
- **React**: 19
- **렌더링**: Server Component
- **광고 플랫폼**: 카카오 애드핏

### 검증 결과
- ✅ https://nbbang.click 배포 완료
- ✅ 초기 HTML에 광고 스크립트 포함 확인
- ✅ Server Component 정상 작동
- ✅ 크롤러 접근성 개선 확인

### 교훈

#### 광고 플랫폼별 특성
| 플랫폼 | ads.txt | 크롤링 방식 | 권장 렌더링 |
|--------|---------|------------|------------|
| **구글 애드센스** | 필수 | JavaScript 실행 가능 | CSR/SSR 모두 가능 |
| **카카오 애드핏** | 불필요 | JavaScript 실행 불가 | SSR 권장 |

#### 설계 원칙
1. **외부 시스템 고려**: 크롤러, 봇, 검색엔진 등 JavaScript 미실행 시스템 고려
2. **Server Component 활용**: Next.js에서 외부 스크립트는 Server Component로 관리
3. **초기 HTML 포함**: 필수 콘텐츠는 초기 HTML에 포함 보장

#### 향후 적용
- 다른 광고 플랫폼 연동 시 SSR 우선 고려
- SEO 관련 작업 시 Server Component 적극 활용
- 크롤러 친화적 구조 유지

### 관련 파일
- `components/KakaoAdFitScript.tsx`
- `app/layout.tsx`

### 참고 문서
- `_company/DECISIONS.md` (DEC-015)
- `_company/meetings/2026-01-28-3month-plan-and-adfit.md`

---

## 2026-01-27: MVP 배포

### 변경 사항
- 초기 MVP 개발 완료
- Vercel 배포: https://nbbang-psi.vercel.app

### 기술 스택
- Next.js 15
- React 19
- Tailwind CSS
- TypeScript

### 주요 기능
- 엔빵 계산 기능
- 반응형 디자인
- 기본 UI/UX

---

**마지막 업데이트**: 2026-01-28
**관리자**: Company Historian
