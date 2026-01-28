import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 엔빵 계산기",
  description: "엔빵 계산기의 개인정보처리방침입니다. 수집하는 개인정보, 쿠키 사용, 문의처 안내를 확인하세요.",
  openGraph: {
    title: "개인정보처리방침 | 엔빵 계산기",
    description: "엔빵 계산기의 개인정보처리방침입니다.",
    url: "https://nbbang.click/privacy",
    siteName: "엔빵 계산기",
    locale: "ko_KR",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* 헤더 */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="text-lg font-bold text-blue-600">
          엔빵 계산기
        </Link>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">개인정보처리방침</h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">1. 수집하는 개인정보</h2>
            <p className="leading-relaxed">
              엔빵 계산기는 <strong>별도의 개인정보를 수집하거나 서버에 저장하지 않습니다.</strong>
            </p>
            <p className="mt-2 leading-relaxed">
              모든 정산 데이터(참가자 이름, 금액 등)는 사용자의 기기(브라우저)에만 저장되며,
              공유 기능 사용 시 URL 파라미터를 통해 전달됩니다. 서버에는 어떠한 데이터도
              전송되거나 저장되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">2. 쿠키 및 분석 도구</h2>
            <p className="leading-relaxed">
              서비스 개선을 위해 <strong>Google Analytics 4 (GA4)</strong>를 사용합니다.
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
              <li>GA4는 익명화된 방문 통계를 수집합니다 (페이지 조회수, 체류 시간 등)</li>
              <li>수집된 데이터는 개인을 식별할 수 없는 형태로 처리됩니다</li>
              <li>쿠키 설정은 브라우저에서 직접 관리하실 수 있습니다</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">3. 광고 서비스</h2>
            <p className="leading-relaxed">
              서비스 운영을 위해 <strong>카카오 애드핏(Kakao AdFit)</strong> 광고 서비스를 사용합니다.
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
              <li>카카오 애드핏은 사용자 관심사 기반 광고를 제공하기 위해 쿠키를 사용할 수 있습니다</li>
              <li>광고 관련 데이터 처리는 카카오 개인정보처리방침을 따릅니다</li>
              <li>광고 개인화를 원하지 않으시면 브라우저 쿠키 설정에서 관리하실 수 있습니다</li>
            </ul>
            <p className="mt-3 leading-relaxed text-sm text-gray-500">
              카카오 개인정보처리방침:{' '}
              <a
                href="https://www.kakao.com/policy/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://www.kakao.com/policy/privacy
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">4. 개인정보 보유 기간</h2>
            <p className="leading-relaxed">
              서버에 저장되는 개인정보가 없으므로 별도의 보유 기간이 적용되지 않습니다.
              브라우저에 저장된 데이터는 사용자가 직접 삭제하거나 브라우저 데이터를
              초기화할 때까지 유지됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">5. 이용자의 권리</h2>
            <p className="leading-relaxed">
              사용자는 언제든지 브라우저의 &quot;초기화&quot; 버튼을 통해 저장된 데이터를 삭제할 수 있습니다.
              또한 브라우저 설정에서 쿠키 및 사이트 데이터를 직접 관리할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">6. 문의처</h2>
            <p className="leading-relaxed">
              개인정보 관련 문의사항이 있으시면 아래로 연락해 주세요.
            </p>
            <div className="mt-3 p-4 bg-gray-50 rounded-lg">
              <p><strong>운영사:</strong> SidequestLab</p>
              <p className="mt-1"><strong>이메일:</strong> contact@sidequestlab.com</p>
              <p className="mt-1"><strong>웹사이트:</strong> <a href="https://sidequestlab.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">sidequestlab.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">7. 개정 이력</h2>
            <ul className="space-y-1 text-gray-600">
              <li><strong>2025년 1월 28일:</strong> 카카오 애드핏 광고 서비스 관련 내용 추가</li>
              <li><strong>2025년 1월 27일:</strong> 최초 제정</li>
            </ul>
          </section>
        </div>
      </main>

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
        <Link href="/privacy" className="hover:text-blue-500">개인정보처리방침</Link>
      </footer>
    </div>
  );
}
