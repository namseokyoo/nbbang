'use client';

import { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import {
  calculateSettlementDetails,
  optimizeTransfers,
  formatCurrency,
  formatNumber,
} from '@/lib/settlement';

export default function SettlementCard() {
  const { participants, rounds } = useStore();
  const [isOptimized, setIsOptimized] = useState(true);

  // 정산 계산
  const settlementDetails = useMemo(() => {
    return calculateSettlementDetails(participants, rounds);
  }, [participants, rounds]);

  // 최적화 적용
  const displaySettlements = useMemo(() => {
    return isOptimized
      ? optimizeTransfers(settlementDetails.settlements)
      : settlementDetails.settlements;
  }, [settlementDetails.settlements, isOptimized]);

  const getParticipantName = (id: string) => {
    return participants.find((p) => p.id === id)?.name || '알 수 없음';
  };

  const hasData = rounds.length > 0 && rounds.some((r) => r.items.length > 0);

  if (!hasData) {
    return (
      <div className="card p-6 h-full flex flex-col animate-fadeIn">
        <h2 className="text-xl font-bold mb-4 text-center">정산 결과</h2>
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p>정산할 내용이 없습니다</p>
            <p className="text-sm mt-2">비용 항목을 추가해주세요</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 h-full flex flex-col animate-fadeIn">
      <h2 className="text-xl font-bold mb-4 text-center">정산 결과</h2>

      <div className="flex-1 overflow-y-auto space-y-6">
        {/* 라운드별 정산 테이블 */}
        <section>
          <h3 className="font-semibold text-gray-700 mb-3">라운드별 부담금</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-2 font-medium">구분</th>
                  {participants.map((p) => (
                    <th key={p.id} className="text-right p-2 font-medium whitespace-nowrap">
                      {p.name}
                    </th>
                  ))}
                  <th className="text-right p-2 font-medium">합계</th>
                </tr>
              </thead>
              <tbody>
                {settlementDetails.roundDetails.map((roundDetail, idx) => {
                  const roundTotal = Object.values(roundDetail).reduce((a, b) => a + b, 0);
                  return (
                    <tr key={idx} className="border-b">
                      <td className="p-2 font-medium">{rounds[idx]?.name || `${idx + 1}차`}</td>
                      {participants.map((p) => (
                        <td key={p.id} className="text-right p-2">
                          {formatNumber(roundDetail[p.id] || 0)}
                        </td>
                      ))}
                      <td className="text-right p-2 font-medium">
                        {formatNumber(roundTotal)}
                      </td>
                    </tr>
                  );
                })}
                {/* 총합계 */}
                <tr className="bg-gray-50 font-semibold">
                  <td className="p-2">합계</td>
                  {participants.map((p) => (
                    <td key={p.id} className="text-right p-2">
                      {formatNumber(settlementDetails.shouldPayTotal[p.id] || 0)}
                    </td>
                  ))}
                  <td className="text-right p-2">
                    {formatNumber(settlementDetails.totalSpentOverall)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 개인별 결제 내역 */}
        <section>
          <h3 className="font-semibold text-gray-700 mb-3">개인별 결제 내역</h3>
          <div className="space-y-2">
            {participants
              .filter((p) => (settlementDetails.totalSpentPerParticipant[p.id] || 0) > 0)
              .map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium">{p.name}</span>
                  <span className="text-green-600 font-semibold">
                    {formatCurrency(settlementDetails.totalSpentPerParticipant[p.id] || 0)}
                  </span>
                </div>
              ))}
            {participants.every(
              (p) => (settlementDetails.totalSpentPerParticipant[p.id] || 0) === 0
            ) && (
              <div className="text-center text-gray-400 py-4">
                결제 내역이 없습니다
              </div>
            )}
          </div>
        </section>

        {/* 개인별 정산 요약 */}
        <section>
          <h3 className="font-semibold text-gray-700 mb-3">개인별 정산</h3>
          <div className="space-y-2">
            {participants.map((p) => {
              const shouldPay = settlementDetails.shouldPayTotal[p.id] || 0;
              const didPay = settlementDetails.didPayTotal[p.id] || 0;
              const balance = shouldPay - didPay;
              const isPositive = balance > 0;

              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium">{p.name}</span>
                    <span className="text-xs text-gray-400 ml-2">
                      (부담: {formatNumber(shouldPay)} | 결제: {formatNumber(didPay)})
                    </span>
                  </div>
                  <span
                    className={`font-semibold ${
                      Math.abs(balance) < 1
                        ? 'text-gray-500'
                        : isPositive
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >
                    {Math.abs(balance) < 1
                      ? '정산 완료'
                      : isPositive
                      ? `내야 함: ${formatCurrency(balance)}`
                      : `받아야 함: ${formatCurrency(Math.abs(balance))}`}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 송금 안내 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700">송금 안내</h3>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={isOptimized}
                onChange={(e) => setIsOptimized(e.target.checked)}
                className="rounded"
              />
              <span>단순화</span>
            </label>
          </div>

          {displaySettlements.length > 0 ? (
            <div className="space-y-2">
              {displaySettlements.map((settlement, idx) => (
                <div key={idx} className="settlement-arrow">
                  <span className="font-medium">{getParticipantName(settlement.from)}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">{getParticipantName(settlement.to)}</span>
                  <span className="text-green-600 font-bold ml-auto">
                    {formatCurrency(settlement.amount)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-4 bg-gray-50 rounded-lg">
              송금할 내역이 없습니다
            </div>
          )}
        </section>

        {/* 총 금액 요약 */}
        <section className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="text-center">
            <span className="text-gray-600">총 사용 금액</span>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {formatCurrency(settlementDetails.totalSpentOverall)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
