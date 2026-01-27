'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import type { Round, ExpenseItem } from '@/types';
import { formatCurrency } from '@/lib/settlement';

interface RoundCardProps {
  round: Round;
}

interface ItemFormData {
  name: string;
  cost: string;
  participants: string[];
  paidBy: string;
}

const initialFormData: ItemFormData = {
  name: '',
  cost: '',
  participants: [],
  paidBy: '',
};

export default function RoundCard({ round }: RoundCardProps) {
  const { participants, removeRound, addItem, updateItem, removeItem } = useStore();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ItemFormData>(initialFormData);

  const manager = participants.find((p) => p.isManager);

  // 라운드 총액 계산
  const roundTotal = round.items.reduce((sum, item) => sum + item.cost, 0);

  const resetForm = () => {
    setFormData({
      ...initialFormData,
      participants: participants.map((p) => p.id), // 기본으로 전체 선택
      paidBy: manager?.id || '',
    });
  };

  const handleStartAddItem = () => {
    resetForm();
    setIsAddingItem(true);
    setEditingItemId(null);
  };

  const handleStartEditItem = (item: ExpenseItem) => {
    setFormData({
      name: item.name,
      cost: item.cost.toString(),
      participants: [...item.participants],
      paidBy: item.paidBy,
    });
    setEditingItemId(item.id);
    setIsAddingItem(false);
  };

  const handleCancel = () => {
    setIsAddingItem(false);
    setEditingItemId(null);
    setFormData(initialFormData);
  };

  const handleSaveItem = () => {
    const cost = parseFloat(formData.cost);
    if (!formData.name.trim() || isNaN(cost) || cost <= 0) return;
    if (formData.participants.length === 0) return;
    if (!formData.paidBy) return;

    if (editingItemId) {
      updateItem(round.id, editingItemId, {
        name: formData.name.trim(),
        cost,
        participants: formData.participants,
        paidBy: formData.paidBy,
      });
    } else {
      addItem(round.id, {
        name: formData.name.trim(),
        cost,
        participants: formData.participants,
        paidBy: formData.paidBy,
      });
    }

    handleCancel();
  };

  const toggleParticipant = (participantId: string) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.includes(participantId)
        ? prev.participants.filter((id) => id !== participantId)
        : [...prev.participants, participantId],
    }));
  };

  const selectAllParticipants = () => {
    setFormData((prev) => ({
      ...prev,
      participants: participants.map((p) => p.id),
    }));
  };

  const deselectAllParticipants = () => {
    setFormData((prev) => ({
      ...prev,
      participants: [],
    }));
  };

  const getParticipantName = (id: string) => {
    return participants.find((p) => p.id === id)?.name || '알 수 없음';
  };

  const isFormValid =
    formData.name.trim() &&
    parseFloat(formData.cost) > 0 &&
    formData.participants.length > 0 &&
    formData.paidBy;

  return (
    <div className="card p-6 h-full flex flex-col animate-fadeIn">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{round.name}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {formatCurrency(roundTotal)}
          </span>
          <button
            onClick={() => removeRound(round.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            title="라운드 삭제"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 항목 목록 */}
      <div className="flex-1 overflow-y-auto mb-4">
        {round.items.length === 0 && !isAddingItem ? (
          <div className="text-center text-gray-400 py-8">
            <p>비용 항목을 추가해주세요</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {round.items.map((item) => (
              <li
                key={item.id}
                className={`p-3 rounded-lg ${
                  editingItemId === item.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {editingItemId === item.id ? (
                  <ItemForm
                    formData={formData}
                    setFormData={setFormData}
                    participants={participants}
                    toggleParticipant={toggleParticipant}
                    selectAll={selectAllParticipants}
                    deselectAll={deselectAllParticipants}
                    onSave={handleSaveItem}
                    onCancel={handleCancel}
                    isValid={!!isFormValid}
                  />
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-blue-600 font-semibold">
                          {formatCurrency(item.cost)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span>결제: {getParticipantName(item.paidBy)}</span>
                        <span className="mx-2">|</span>
                        <span>
                          참여: {item.participants.length === participants.length
                            ? '전체'
                            : item.participants.map(getParticipantName).join(', ')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStartEditItem(item)}
                        className="text-gray-400 hover:text-blue-500 transition-colors p-1"
                        title="수정"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeItem(round.id, item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="삭제"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* 새 항목 추가 폼 */}
        {isAddingItem && (
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 mt-2">
            <ItemForm
              formData={formData}
              setFormData={setFormData}
              participants={participants}
              toggleParticipant={toggleParticipant}
              selectAll={selectAllParticipants}
              deselectAll={deselectAllParticipants}
              onSave={handleSaveItem}
              onCancel={handleCancel}
              isValid={!!isFormValid}
            />
          </div>
        )}
      </div>

      {/* 항목 추가 버튼 */}
      {!isAddingItem && !editingItemId && participants.length > 0 && (
        <button
          onClick={handleStartAddItem}
          className="btn btn-primary w-full"
        >
          + 항목 추가
        </button>
      )}

      {participants.length === 0 && (
        <div className="text-center text-gray-400 text-sm">
          참가자를 먼저 추가해주세요
        </div>
      )}
    </div>
  );
}

// 항목 입력 폼 컴포넌트
interface ItemFormProps {
  formData: ItemFormData;
  setFormData: React.Dispatch<React.SetStateAction<ItemFormData>>;
  participants: { id: string; name: string; isManager: boolean }[];
  toggleParticipant: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  onSave: () => void;
  onCancel: () => void;
  isValid: boolean;
}

function ItemForm({
  formData,
  setFormData,
  participants,
  toggleParticipant,
  selectAll,
  deselectAll,
  onSave,
  onCancel,
  isValid,
}: ItemFormProps) {
  return (
    <div className="space-y-3">
      {/* 항목명 */}
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        placeholder="항목명 (예: 삼겹살)"
        className="w-full"
        maxLength={50}
      />

      {/* 금액 */}
      <input
        type="number"
        value={formData.cost}
        onChange={(e) => setFormData((prev) => ({ ...prev, cost: e.target.value }))}
        placeholder="금액"
        className="w-full"
        min="0"
        step="100"
      />

      {/* 결제자 선택 */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">결제자</label>
        <select
          value={formData.paidBy}
          onChange={(e) => setFormData((prev) => ({ ...prev, paidBy: e.target.value }))}
          className="w-full p-2 border border-gray-200 rounded-lg"
        >
          <option value="">선택해주세요</option>
          {participants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} {p.isManager && '(총무)'}
            </option>
          ))}
        </select>
      </div>

      {/* 참여자 선택 */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm text-gray-600">참여자</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={selectAll}
              className="text-xs text-blue-500 hover:text-blue-700"
            >
              전체 선택
            </button>
            <button
              type="button"
              onClick={deselectAll}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              전체 해제
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {participants.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => toggleParticipant(p.id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                formData.participants.includes(p.id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary flex-1"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={!isValid}
          className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          저장
        </button>
      </div>
    </div>
  );
}
