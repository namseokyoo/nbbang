'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useStore } from '@/lib/store';
import ParticipantsCard from './ParticipantsCard';
import RoundCard from './RoundCard';
import SettlementCard from './SettlementCard';

export default function Carousel() {
  const { rounds, participants } = useStore();
  const [prevRoundsLength, setPrevRoundsLength] = useState(rounds.length);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'trimSnaps',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 총 슬라이드 수: 참가자 + 라운드들 + 정산결과
  const totalSlides = 1 + rounds.length + 1;

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    // Initial sync with carousel state - required for external library integration
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(emblaApi.selectedScrollSnap());

    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', handleSelect);
    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi]);

  // 라운드 추가 감지 시 해당 슬라이드로 이동
  useEffect(() => {
    if (rounds.length > prevRoundsLength && emblaApi) {
      // 새 라운드가 추가됨 - 해당 슬라이드로 이동
      setTimeout(() => {
        // 새로 추가된 라운드로 이동 (참가자 카드 다음)
        const newIndex = rounds.length; // 참가자(0) + 라운드들
        emblaApi.scrollTo(newIndex);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrevRoundsLength(rounds.length);
  }, [rounds.length, prevRoundsLength, emblaApi]);

  const getSlideLabel = (index: number) => {
    if (index === 0) return '참가자';
    if (index === totalSlides - 1) return '결과';
    return rounds[index - 1]?.name || `${index}차`;
  };

  return (
    <div data-testid="carousel-container" className="h-full flex flex-col">
      {/* 캐러셀 영역 */}
      <div data-testid="carousel-viewport" className="flex-1 relative overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {/* 참가자 카드 */}
          <div className="flex-shrink-0 w-full md:w-[90%] lg:w-[70%] px-2 md:px-4">
            <div className="h-full py-4">
              <ParticipantsCard />
            </div>
          </div>

          {/* 라운드 카드들 */}
          {rounds.map((round) => (
            <div
              key={round.id}
              className="flex-shrink-0 w-full md:w-[90%] lg:w-[70%] px-2 md:px-4"
            >
              <div className="h-full py-4">
                <RoundCard round={round} />
              </div>
            </div>
          ))}

          {/* 정산 결과 카드 */}
          <div className="flex-shrink-0 w-full md:w-[90%] lg:w-[70%] px-2 md:px-4">
            <div className="h-full py-4">
              <SettlementCard />
            </div>
          </div>
        </div>

        {/* 좌측 네비게이션 */}
        {selectedIndex > 0 && (
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/40 hover:bg-gray-800/60 text-white p-2 md:p-3 rounded-r-lg transition-colors z-10"
            aria-label="이전"
            data-testid="carousel-prev-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* 우측 네비게이션 */}
        {selectedIndex < totalSlides - 1 && (
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/40 hover:bg-gray-800/60 text-white p-2 md:p-3 rounded-l-lg transition-colors z-10"
            aria-label="다음"
            data-testid="carousel-next-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* 하단 인디케이터 */}
      <div data-testid="carousel-indicators" className="py-4 flex items-center justify-center gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`carousel-dot ${selectedIndex === index ? 'active' : ''}`}
            aria-label={getSlideLabel(index)}
            title={getSlideLabel(index)}
            data-testid={`carousel-dot-${index}`}
          />
        ))}
      </div>

      </div>
  );
}
