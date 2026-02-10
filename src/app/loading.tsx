export default function Loading() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-400">로딩 중...</span>
        </div>
      </main>
    </div>
  );
}
