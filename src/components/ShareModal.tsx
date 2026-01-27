'use client';

import { useState, useEffect, useRef } from 'react';
import { trackShareLinkCopy, trackShareWeb } from '@/lib/analytics';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export default function ShareModal({ isOpen, onClose, shareUrl }: ShareModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [supportsWebShare, setSupportsWebShare] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Web Share API 지원 여부 체크
    setSupportsWebShare(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.select();
    }
  }, [isOpen]);

  useEffect(() => {
    // ESC 키로 모달 닫기
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      trackShareLinkCopy();

      // 2초 후 원래대로 복원
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      // 폴백: 수동 선택
      if (inputRef.current) {
        inputRef.current.select();
        alert('Ctrl+C (또는 Cmd+C)를 눌러 복사해주세요.');
      }
    }
  };

  const handleWebShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: '엔빵 계산기 - 정산 공유',
        text: '정산 내역을 확인해주세요!',
        url: shareUrl,
      });
      trackShareWeb();
      onClose();
    } catch (error) {
      // 사용자가 공유를 취소한 경우는 에러로 처리하지 않음
      if ((error as Error).name !== 'AbortError') {
        console.error('공유 실패:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 모달 콘텐츠 */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md animate-fadeIn">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 id="share-modal-title" className="text-lg font-bold text-gray-900">
            정산 결과 공유
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="닫기"
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

        {/* 본문 */}
        <div className="p-4 space-y-4">
          {/* 안내 문구 */}
          <p className="text-sm text-gray-600">
            아래 링크를 공유하면 정산 내역을 함께 볼 수 있어요.
          </p>

          {/* 링크 입력창 + 복사 버튼 */}
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all min-w-[80px] ${
                isCopied
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isCopied ? (
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  복사됨
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  복사
                </span>
              )}
            </button>
          </div>

          {/* Web Share API 버튼 (지원하는 경우만 표시) */}
          {supportsWebShare && (
            <button
              onClick={handleWebShare}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              다른 앱으로 공유하기
            </button>
          )}
        </div>

        {/* 푸터 */}
        <div className="px-4 pb-4">
          <p className="text-xs text-gray-400 text-center">
            링크에는 정산 데이터가 포함되어 있어요
          </p>
        </div>
      </div>
    </div>
  );
}
