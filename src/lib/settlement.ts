import type { Participant, Round, Settlement, SettlementDetails } from '@/types';

/**
 * 정산 상세 계산
 * - 라운드별 개인 부담금
 * - 개인별 총 부담/결제 금액
 * - 송금 정보 생성
 */
export function calculateSettlementDetails(
  participants: Participant[],
  rounds: Round[]
): SettlementDetails {
  const roundDetails: Record<string, number>[] = [];
  const shouldPayTotal: Record<string, number> = {};
  const didPayTotal: Record<string, number> = {};
  const totalSpentPerParticipant: Record<string, number> = {};
  let totalSpentOverall = 0;

  // 초기화
  participants.forEach((p) => {
    shouldPayTotal[p.id] = 0;
    didPayTotal[p.id] = 0;
    totalSpentPerParticipant[p.id] = 0;
  });

  // 각 라운드별 계산
  rounds.forEach((round) => {
    const roundDetail: Record<string, number> = {};

    // 라운드별 개인 부담금 초기화
    participants.forEach((p) => {
      roundDetail[p.id] = 0;
    });

    // 각 항목별 계산
    round.items.forEach((item) => {
      const itemCost = item.cost;
      const itemParticipants = item.participants;
      const payer = item.paidBy;

      // 결제자의 실제 지불액 기록
      if (didPayTotal[payer] !== undefined) {
        didPayTotal[payer] += itemCost;
        totalSpentPerParticipant[payer] += itemCost;
      }

      // 참여자별 부담액 계산
      if (itemParticipants.length > 0) {
        const costPerPerson = itemCost / itemParticipants.length;

        itemParticipants.forEach((participantId) => {
          if (roundDetail[participantId] !== undefined) {
            roundDetail[participantId] += costPerPerson;
            shouldPayTotal[participantId] += costPerPerson;
          }
        });
      }

      totalSpentOverall += itemCost;
    });

    roundDetails.push(roundDetail);
  });

  // 정산 금액 계산 (총무 기준)
  const manager = participants.find((p) => p.isManager);
  const settlements: Settlement[] = [];

  if (manager) {
    participants.forEach((participant) => {
      const shouldPay = shouldPayTotal[participant.id] || 0;
      const didPay = didPayTotal[participant.id] || 0;
      const balance = shouldPay - didPay;

      if (balance > 0.5) {
        // 더 내야 하는 경우 → 총무에게 송금
        settlements.push({
          from: participant.id,
          to: manager.id,
          amount: Math.round(balance),
        });
      } else if (balance < -0.5) {
        // 돈을 돌려받아야 하는 경우 → 총무가 송금
        settlements.push({
          from: manager.id,
          to: participant.id,
          amount: Math.round(Math.abs(balance)),
        });
      }
    });
  }

  return {
    roundDetails,
    shouldPayTotal,
    didPayTotal,
    totalSpentOverall,
    totalSpentPerParticipant,
    settlements,
  };
}

/**
 * 송금 최적화 알고리즘
 * 채무자/채권자 매칭으로 송금 횟수 최소화
 */
export function optimizeTransfers(settlements: Settlement[]): Settlement[] {
  // 순 잔고 계산
  const netAmounts: Record<string, number> = {};

  settlements.forEach((s) => {
    netAmounts[s.from] = (netAmounts[s.from] || 0) - s.amount;
    netAmounts[s.to] = (netAmounts[s.to] || 0) + s.amount;
  });

  // 채무자/채권자 리스트 생성
  const debtors: { id: string; amount: number }[] = [];
  const creditors: { id: string; amount: number }[] = [];

  Object.entries(netAmounts).forEach(([id, amount]) => {
    if (amount < -0.5) {
      debtors.push({ id, amount: Math.abs(amount) });
    } else if (amount > 0.5) {
      creditors.push({ id, amount });
    }
  });

  // 금액 기준 정렬 (큰 금액부터)
  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  // 최적화된 송금 목록 생성
  const optimizedSettlements: Settlement[] = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const transfer = Math.min(debtor.amount, creditor.amount);

    if (transfer > 0.5) {
      optimizedSettlements.push({
        from: debtor.id,
        to: creditor.id,
        amount: Math.round(transfer),
      });
    }

    debtor.amount -= transfer;
    creditor.amount -= transfer;

    if (debtor.amount < 0.5) i++;
    if (creditor.amount < 0.5) j++;
  }

  return optimizedSettlements;
}

/**
 * 금액 포맷팅 (원화)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/**
 * 금액 포맷팅 (단순 숫자)
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}
