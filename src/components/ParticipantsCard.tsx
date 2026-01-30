'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';

export default function ParticipantsCard() {
  const [newName, setNewName] = useState('');
  const { participants, addParticipant, removeParticipant, setManager } = useStore();

  const handleAddParticipant = () => {
    const trimmedName = newName.trim();
    if (trimmedName) {
      // 중복 체크
      const isDuplicate = participants.some(
        (p) => p.name.toLowerCase() === trimmedName.toLowerCase()
      );
      if (!isDuplicate) {
        addParticipant(trimmedName);
        setNewName('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddParticipant();
    }
  };

  return (
    <div data-testid="participants-card" className="card p-6 h-full flex flex-col animate-fadeIn">
      <h2 className="text-xl font-bold mb-4 text-center">참가자</h2>

      {/* 참가자 입력 */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="이름을 입력하세요"
          className="flex-1"
          maxLength={20}
          data-testid="participant-name-input"
        />
        <button
          onClick={handleAddParticipant}
          disabled={!newName.trim()}
          className="btn btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="add-participant-button"
        >
          추가
        </button>
      </div>

      {/* 참가자 목록 */}
      <div className="flex-1 overflow-y-auto">
        {participants.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>참가자를 추가해주세요</p>
            <p className="text-sm mt-2">첫 번째 참가자가 총무가 됩니다</p>
          </div>
        ) : (
          <ul data-testid="participant-list" className="space-y-2">
            {participants.map((participant) => (
              <li
                key={participant.id}
                data-testid={`participant-item-${participant.id}`}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  participant.isManager
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{participant.name}</span>
                  {participant.isManager && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                      총무
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!participant.isManager && (
                    <button
                      onClick={() => setManager(participant.id)}
                      className="text-sm text-blue-500 hover:text-blue-700 px-2 py-1"
                      title="총무로 지정"
                      data-testid={`set-manager-button-${participant.id}`}
                    >
                      총무 지정
                    </button>
                  )}
                  <button
                    onClick={() => removeParticipant(participant.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="삭제"
                    data-testid={`remove-participant-button-${participant.id}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 참가자 수 표시 */}
      {participants.length > 0 && (
        <div className="text-center text-gray-500 text-sm mt-4 pt-4 border-t">
          총 {participants.length}명
        </div>
      )}
    </div>
  );
}
