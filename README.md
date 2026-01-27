# 엔빵 계산기 (N-ppang Calculator)

> 모임, 회식 후 복잡한 정산을 간편하게!

[![Deploy](https://img.shields.io/badge/deploy-vercel-black)](https://nbbang.click)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## 주요 기능

- **다차수 정산**: 1차, 2차, 3차 별도 정산 지원
- **선택적 참여**: 일부만 참여한 항목 처리
- **송금 최적화**: 최소 송금 횟수로 정산
- **URL 공유**: 정산 결과를 링크로 공유 (데이터 압축)

## 기술 스택

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js | 16.1.4 |
| **Language** | TypeScript | 5.x |
| **UI Library** | React | 19.2.3 |
| **Styling** | Tailwind CSS | 4.x |
| **State** | Zustand | 5.0.10 |
| **Deploy** | Vercel | - |

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 사용 방법

1. **참여자 추가**: 정산에 참여할 사람들을 추가합니다
2. **차수 입력**: 1차, 2차 등 각 차수별 금액과 참여자를 선택합니다
3. **정산 확인**: 누가 누구에게 얼마를 보내야 하는지 확인합니다
4. **공유하기**: 공유 버튼으로 링크를 복사하여 친구들에게 전달합니다

## 링크

- **서비스**: [https://nbbang.click](https://nbbang.click)
- **GitHub**: [https://github.com/namseokyoo/nbbang](https://github.com/namseokyoo/nbbang)

## 라이선스

MIT License - SidequestLab
