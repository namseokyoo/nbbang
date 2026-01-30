'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import Carousel from '@/components/Carousel';
import ShareModal from '@/components/ShareModal';
import KakaoAdFit from '@/components/KakaoAdFit';
import ActionBar from '@/components/ActionBar';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const { importState, exportState, clearAll, participants, rounds, addRound } = useStore();

  useEffect(() => {
    // Client-side initialization - required for hydration safety
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    // URL 파라미터에서 상태 가져오기
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (data) {
      const success = importState(data);
      if (success) {
        // URL 정리 (히스토리 교체)
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, [importState]);

  const handleShare = () => {
    const data = exportState();
    const url = `${window.location.origin}${window.location.pathname}?data=${data}`;
    setShareUrl(url);
    setIsShareModalOpen(true);
  };

  const handleClearAll = () => {
    if (confirm('모든 데이터를 삭제하시겠습니까?')) {
      clearAll();
    }
  };

  const hasData = participants.length > 0 || rounds.length > 0;

  const handleAddRound = () => {
    addRound();
    // 캐러셀 이동은 Carousel 내부에서 처리
  };

  // 서버 사이드 렌더링 방지 (hydration 이슈)
  if (!isClient) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col">
      {/* 헤더 */}
      <header data-testid="app-header" className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-bold text-blue-600">엔빵 계산기</h1>
        <div className="flex items-center gap-2">
          {hasData && (
            <>
              <button
                onClick={handleShare}
                className="btn btn-secondary text-sm py-1.5 px-3"
                title="공유하기"
                data-testid="share-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                공유
              </button>
              <button
                onClick={handleClearAll}
                className="btn btn-danger text-sm py-1.5 px-3"
                title="초기화"
                data-testid="clear-all-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                초기화
              </button>
            </>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-hidden">
        <Carousel />
      </main>

      {/* Action Bar - 차수 추가 버튼 */}
      <ActionBar
        onAddRound={handleAddRound}
        showButton={participants.length > 0}
      />

      {/* 광고 영역 */}
      <div className="bg-gray-50 border-t py-3">
        <KakaoAdFit
          adUnitId="DAN-tGpG7VditprGww0q"
          width={320}
          height={100}
        />
      </div>

      {/* 푸터 */}
      <footer className="bg-white border-t py-2 text-center text-xs text-gray-400">
        <a
          href="https://sidequestlab.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          SidequestLab
        </a>
        {' | '}
        <a href="/privacy" className="hover:text-blue-500">개인정보처리방침</a>
      </footer>

      {/* 공유 모달 */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareUrl={shareUrl}
      />
    </div>
  );
}
