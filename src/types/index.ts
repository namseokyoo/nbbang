// 참가자
export interface Participant {
  id: string;
  name: string;
  isManager: boolean; // 총무 여부
}

// 비용 항목
export interface ExpenseItem {
  id: string;
  name: string;           // 항목명 (예: "삼겹살")
  cost: number;           // 금액
  participants: string[]; // 참여자 ID 목록
  paidBy: string;         // 결제자 ID
}

// 라운드 (차수)
export interface Round {
  id: string;
  name: string; // "1차", "2차" 또는 커스텀
  items: ExpenseItem[];
}

// 정산 결과 - 송금 정보
export interface Settlement {
  from: string;   // 송금자 ID
  to: string;     // 수취자 ID
  amount: number; // 금액
}

// 정산 상세 결과
export interface SettlementDetails {
  // 라운드별 개인 부담금 { participantId: amount }
  roundDetails: Record<string, number>[];
  // 개인별 총 부담 금액
  shouldPayTotal: Record<string, number>;
  // 개인별 총 결제 금액
  didPayTotal: Record<string, number>;
  // 전체 총액
  totalSpentOverall: number;
  // 개인별 결제 내역
  totalSpentPerParticipant: Record<string, number>;
  // 송금 정보
  settlements: Settlement[];
}

// 앱 전체 상태
export interface AppState {
  participants: Participant[];
  rounds: Round[];

  // Actions
  addParticipant: (name: string) => void;
  removeParticipant: (id: string) => void;
  setManager: (id: string) => void;

  addRound: () => void;
  removeRound: (roundId: string) => void;
  updateRoundName: (roundId: string, name: string) => void;

  addItem: (roundId: string, item: Omit<ExpenseItem, 'id'>) => void;
  updateItem: (roundId: string, itemId: string, item: Partial<ExpenseItem>) => void;
  removeItem: (roundId: string, itemId: string) => void;

  clearAll: () => void;

  // Import/Export for URL sharing
  exportState: () => string;
  importState: (data: string) => boolean;
}

// 유틸리티 타입: 저장용 상태 (함수 제외)
export interface SerializableState {
  participants: Participant[];
  rounds: Round[];
}
