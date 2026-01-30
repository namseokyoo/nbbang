#!/usr/bin/env node
/**
 * 엔빵 계산기 블로그용 스크린샷 자동 캡처 스크립트
 *
 * 사용법:
 *   pnpm screenshot              # 로컬 서버 (http://localhost:3000)
 *   pnpm screenshot:prod         # 프로덕션 서버 (https://nbbang.click)
 *
 * 결과물:
 *   - screenshots/nbbang-main.png      (메인 화면, 1280x720)
 *   - screenshots/nbbang-result.png    (정산 결과 화면, 1280x720)
 *   - screenshots/nbbang-mobile.png    (모바일 뷰, 375x667)
 *
 * Board Advisor 권고: "Start Small, Evolve" - 복잡한 JSON 엔진 없이 하드코딩된 스크립트로 시작
 */

import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, '..', 'screenshots');

// 환경 설정
const BASE_URL = process.argv[2] || 'http://localhost:3000';
const IS_PROD = BASE_URL.includes('nbbang.click');

console.log(`\n📸 엔빵 계산기 스크린샷 캡처 시작`);
console.log(`   대상: ${BASE_URL}`);
console.log(`   환경: ${IS_PROD ? '프로덕션' : '로컬'}\n`);

// 샘플 데이터 - 블로그용 시나리오
const SAMPLE_PARTICIPANTS = ['김철수', '이영희', '박민수'];
const SAMPLE_EXPENSES = [
  { payer: '김철수', amount: '45000', name: '저녁 식사' },
  { payer: '이영희', amount: '15000', name: '카페' },
];

async function captureScreenshots() {
  // 스크린샷 디렉토리 생성
  await mkdir(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    // ============================================
    // 1. 메인 화면 캡처 (데스크톱, 1280x720)
    // ============================================
    console.log('1️⃣  메인 화면 캡처 중...');

    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      deviceScaleFactor: 2, // Retina 품질
    });
    const desktopPage = await desktopContext.newPage();

    await desktopPage.goto(BASE_URL, { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(1000); // 애니메이션 완료 대기

    await desktopPage.screenshot({
      path: join(SCREENSHOTS_DIR, 'nbbang-main.png'),
      fullPage: false,
    });
    console.log('   ✅ nbbang-main.png 저장 완료');

    // ============================================
    // 2. 샘플 데이터 입력 후 정산 결과 캡처
    // ============================================
    console.log('2️⃣  샘플 데이터 입력 및 정산 결과 캡처 중...');

    // 참가자 추가 (data-testid 활용)
    for (const name of SAMPLE_PARTICIPANTS) {
      const participantInput = await desktopPage.$('[data-testid="participant-name-input"]');
      if (participantInput) {
        await participantInput.fill(name);
        await desktopPage.waitForTimeout(100);

        // 추가 버튼 클릭
        const addButton = await desktopPage.$('[data-testid="add-participant-button"]');
        if (addButton) {
          await addButton.click();
          await desktopPage.waitForTimeout(300);
        }
      }
    }
    console.log(`   ✅ 참가자 ${SAMPLE_PARTICIPANTS.length}명 추가 완료`);

    // 비용 항목 추가 (차수 추가 → 비용 추가 순서)
    for (let i = 0; i < SAMPLE_EXPENSES.length; i++) {
      const expense = SAMPLE_EXPENSES[i];

      // 매 차수마다 차수 추가 버튼 클릭 (엔빵 UI: 참가자 추가 → 차수 추가 → 비용 추가)
      const addRoundBtn = await desktopPage.$('[data-testid="add-round-button"]');
      if (addRoundBtn) {
        await addRoundBtn.click();
        await desktopPage.waitForTimeout(500);
        console.log(`   ✅ ${i + 1}차 추가 완료`);
      }

      // 비용 추가 버튼 클릭 (해당 차수의 버튼)
      const addExpenseButtons = await desktopPage.$$('[data-testid^="add-expense-button-"]');
      const addExpenseBtn = addExpenseButtons[i];
      if (addExpenseBtn) {
        await addExpenseBtn.click();
        await desktopPage.waitForTimeout(300);

        // 항목명 입력
        const nameInput = await desktopPage.$('[data-testid="expense-name-input"]');
        if (nameInput) {
          await nameInput.fill(expense.name);
        }

        // 금액 입력
        const costInput = await desktopPage.$('[data-testid="expense-cost-input"]');
        if (costInput) {
          await costInput.fill(expense.amount);
        }

        // 결제자 선택 (이름으로 매칭)
        const payerSelect = await desktopPage.$('[data-testid="expense-payer-select"]');
        if (payerSelect) {
          // select 옵션에서 이름이 포함된 옵션 선택
          const options = await desktopPage.$$('[data-testid="expense-payer-select"] option');
          for (const option of options) {
            const text = await option.textContent();
            if (text && text.includes(expense.payer)) {
              const value = await option.getAttribute('value');
              if (value) {
                await payerSelect.selectOption(value);
                break;
              }
            }
          }
        }

        // 저장 버튼 클릭
        const saveBtn = await desktopPage.$('[data-testid="expense-save-button"]');
        if (saveBtn) {
          await saveBtn.click();
          await desktopPage.waitForTimeout(300);
        }
      }
    }
    console.log(`   ✅ 비용 항목 ${SAMPLE_EXPENSES.length}개 추가 완료`);

    // 정산 결과가 표시될 때까지 대기
    await desktopPage.waitForTimeout(1000);

    // 정산 결과 영역으로 스크롤
    await desktopPage.evaluate(() => {
      const settlementCard = document.querySelector('[data-testid="settlement-card"]');
      if (settlementCard) {
        settlementCard.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    });

    await desktopPage.screenshot({
      path: join(SCREENSHOTS_DIR, 'nbbang-result.png'),
      fullPage: false,
    });
    console.log('   ✅ nbbang-result.png 저장 완료');

    await desktopContext.close();

    // ============================================
    // 3. 모바일 뷰 캡처 (iPhone SE, 375x667)
    // ============================================
    console.log('3️⃣  모바일 뷰 캡처 중...');

    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);

    await mobilePage.screenshot({
      path: join(SCREENSHOTS_DIR, 'nbbang-mobile.png'),
      fullPage: false,
    });
    console.log('   ✅ nbbang-mobile.png 저장 완료');

    await mobileContext.close();

    // ============================================
    // 완료 메시지
    // ============================================
    console.log('\n🎉 스크린샷 캡처 완료!');
    console.log(`   저장 위치: ${SCREENSHOTS_DIR}`);
    console.log('   파일 목록:');
    console.log('   - nbbang-main.png   (메인 화면)');
    console.log('   - nbbang-result.png (정산 결과)');
    console.log('   - nbbang-mobile.png (모바일 뷰)\n');

  } catch (error) {
    console.error('❌ 스크린샷 캡처 실패:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
