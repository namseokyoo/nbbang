# 엔빵 계산기 스크립트

## 스크린샷 캡처 (`capture-screenshots.mjs`)

블로그 및 마케팅용 스크린샷을 자동으로 캡처하는 Playwright 스크립트입니다.

### 사용법

```bash
# 로컬 개발 서버 대상 (http://localhost:3000)
pnpm screenshot

# 프로덕션 서버 대상 (https://nbbang.click)
pnpm screenshot:prod
```

### 사전 준비

1. Playwright 브라우저 설치 (최초 1회)
```bash
npx playwright install chromium
```

2. 로컬 테스트 시 개발 서버 실행 필요
```bash
pnpm dev  # 다른 터미널에서
```

### 결과물

`screenshots/` 폴더에 다음 파일이 생성됩니다:

| 파일명 | 설명 | 뷰포트 |
|--------|------|--------|
| `nbbang-main.png` | 메인 화면 (초기 상태) | 1280x720 |
| `nbbang-result.png` | 정산 결과 화면 (샘플 데이터) | 1280x720 |
| `nbbang-mobile.png` | 모바일 뷰 | 375x667 |

### 샘플 데이터

스크린샷에 사용되는 샘플 시나리오:
- 참가자: 철수, 영희, 민수
- 차수 1: 철수가 45,000원 결제 (저녁 식사)
- 차수 2: 영희가 15,000원 결제 (카페)
- 차수 3: 민수가 30,000원 결제 (택시비)

### 확장 계획

현재는 "Start Small, Evolve" 원칙에 따라 하드코딩된 스크립트입니다.
향후 필요 시:
- JSON 기반 시나리오 설정
- WebP 변환 지원
- 다른 프로젝트로 확장

---

*Board Advisor 권고: "Start Small, Evolve" - 복잡한 시스템 없이 작동하는 것부터 시작*
