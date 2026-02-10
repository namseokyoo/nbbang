export default function PrivacyLoading() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="bg-white border-b px-4 py-3 sticky top-0 z-30">
        <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
      </header>
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-2/5" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
