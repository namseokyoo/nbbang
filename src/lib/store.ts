'use client';

import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import type { AppState, Participant, Round, ExpenseItem, SerializableState } from '@/types';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import * as Sentry from '@sentry/nextjs';

// 간단한 ID 생성 함수
const generateId = () => Math.random().toString(36).substring(2, 9);

// localStorage wrapper with error handling
const createSafeStorage = (): StateStorage => {
  return {
    getItem: (name: string): string | null => {
      try {
        return localStorage.getItem(name);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to get item from localStorage:', error);
        }
        Sentry.captureException(error, {
          tags: { operation: 'localStorage.getItem' },
          extra: { key: name },
        });
        return null;
      }
    },
    setItem: (name: string, value: string): void => {
      try {
        localStorage.setItem(name, value);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to set item to localStorage:', error);
        }
        Sentry.captureException(error, {
          tags: { operation: 'localStorage.setItem' },
          extra: { key: name },
        });
      }
    },
    removeItem: (name: string): void => {
      try {
        localStorage.removeItem(name);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to remove item from localStorage:', error);
        }
        Sentry.captureException(error, {
          tags: { operation: 'localStorage.removeItem' },
          extra: { key: name },
        });
      }
    },
  };
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      participants: [],
      rounds: [],

      // 참가자 관리
      addParticipant: (name: string) => {
        const newParticipant: Participant = {
          id: generateId(),
          name,
          isManager: get().participants.length === 0, // 첫 번째 참가자는 총무로 설정
        };

        set((state) => ({
          participants: [...state.participants, newParticipant],
        }));
      },

      removeParticipant: (id: string) => {
        set((state) => {
          const removedParticipant = state.participants.find((p) => p.id === id);
          let updatedParticipants = state.participants.filter((p) => p.id !== id);

          // 총무가 삭제되면 첫 번째 참가자를 총무로 설정
          if (removedParticipant?.isManager && updatedParticipants.length > 0) {
            updatedParticipants = updatedParticipants.map((p, idx) => ({
              ...p,
              isManager: idx === 0,
            }));
          }

          // 라운드의 항목에서 해당 참가자 제거
          const updatedRounds = state.rounds.map((round) => ({
            ...round,
            items: round.items.map((item) => ({
              ...item,
              participants: item.participants.filter((pId) => pId !== id),
              // 결제자가 삭제되면 첫 번째 참가자로 변경
              paidBy: item.paidBy === id
                ? (updatedParticipants[0]?.id || '')
                : item.paidBy,
            })),
          }));

          return {
            participants: updatedParticipants,
            rounds: updatedRounds,
          };
        });
      },

      setManager: (id: string) => {
        set((state) => ({
          participants: state.participants.map((p) => ({
            ...p,
            isManager: p.id === id,
          })),
        }));
      },

      // 라운드 관리
      addRound: () => {
        const roundNumber = get().rounds.length + 1;
        const newRound: Round = {
          id: generateId(),
          name: `${roundNumber}차`,
          items: [],
        };

        set((state) => ({
          rounds: [...state.rounds, newRound],
        }));
      },

      removeRound: (roundId: string) => {
        set((state) => ({
          rounds: state.rounds.filter((r) => r.id !== roundId),
        }));
      },

      updateRoundName: (roundId: string, name: string) => {
        set((state) => ({
          rounds: state.rounds.map((r) =>
            r.id === roundId ? { ...r, name } : r
          ),
        }));
      },

      // 비용 항목 관리
      addItem: (roundId: string, item: Omit<ExpenseItem, 'id'>) => {
        const newItem: ExpenseItem = {
          ...item,
          id: generateId(),
        };

        set((state) => ({
          rounds: state.rounds.map((r) =>
            r.id === roundId
              ? { ...r, items: [...r.items, newItem] }
              : r
          ),
        }));
      },

      updateItem: (roundId: string, itemId: string, updates: Partial<ExpenseItem>) => {
        set((state) => ({
          rounds: state.rounds.map((r) =>
            r.id === roundId
              ? {
                  ...r,
                  items: r.items.map((item) =>
                    item.id === itemId ? { ...item, ...updates } : item
                  ),
                }
              : r
          ),
        }));
      },

      removeItem: (roundId: string, itemId: string) => {
        set((state) => ({
          rounds: state.rounds.map((r) =>
            r.id === roundId
              ? { ...r, items: r.items.filter((item) => item.id !== itemId) }
              : r
          ),
        }));
      },

      // 전체 초기화
      clearAll: () => {
        set({
          participants: [],
          rounds: [],
        });
      },

      // URL 공유를 위한 상태 내보내기
      exportState: () => {
        const state = get();
        const serializableState: SerializableState = {
          participants: state.participants,
          rounds: state.rounds,
        };
        const json = JSON.stringify(serializableState);
        return compressToEncodedURIComponent(json);
      },

      // URL에서 상태 가져오기
      importState: (data: string) => {
        try {
          const json = decompressFromEncodedURIComponent(data);
          if (!json) return false;

          const parsed: SerializableState = JSON.parse(json);

          // 기본 유효성 검사
          if (!Array.isArray(parsed.participants) || !Array.isArray(parsed.rounds)) {
            return false;
          }

          set({
            participants: parsed.participants,
            rounds: parsed.rounds,
          });

          return true;
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'nbbang-storage',
      storage: createJSONStorage(() => createSafeStorage()),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Failed to rehydrate state from localStorage:', error);
          }
          Sentry.captureException(error, {
            tags: { operation: 'zustand.rehydrate' },
            extra: { storeName: 'nbbang-storage' },
          });
        }
      },
    }
  )
);

// Selector hooks for better performance
export const useParticipants = () => useStore((state) => state.participants);
export const useRounds = () => useStore((state) => state.rounds);
export const useManager = () => useStore((state) => state.participants.find((p) => p.isManager));
