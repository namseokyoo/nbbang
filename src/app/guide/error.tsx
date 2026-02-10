"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";

export default function GuideError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="bg-white border-b px-4 py-3 sticky top-0 z-30">
        <Link href="/" className="text-lg font-bold text-blue-600">
          엔빵 계산기
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="card p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            페이지를 불러올 수 없습니다
          </h2>
          <p className="text-gray-500 mb-6">
            일시적인 오류가 발생했습니다.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="btn btn-primary px-6 py-2.5"
              aria-label="페이지 다시 시도"
            >
              다시 시도
            </button>
            <Link href="/" className="btn btn-secondary px-6 py-2.5">
              홈으로
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
