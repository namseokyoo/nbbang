import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서비스 소개 | 엔빵 계산기",
  description: "엔빵 계산기는 모임, 회식, 여행 후 복잡한 정산을 간편하게 해결하는 무료 서비스입니다. 주요 기능과 개발사 정보를 확인하세요.",
  openGraph: {
    title: "서비스 소개 | 엔빵 계산기",
    description: "모임이나 회식 후 복잡한 정산을 간편하게!",
    url: "https://nbbang.click/about",
    siteName: "엔빵 계산기",
    locale: "ko_KR",
    type: "website",
  },
};

export default function AboutPage() {
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
        <h1 className="text-2xl font-bold mb-6">서비스 소개</h1>

        <div className="space-y-8 text-gray-700">
          {/* 서비스 개요 */}
          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">엔빵 계산기란?</h2>
            <p className="leading-relaxed">
              엔빵 계산기는 모임, 회식, 여행 등에서 발생하는 복잡한 정산 문제를 간편하게 해결해주는
              무료 웹 서비스입니다. &quot;엔빵&quot;은 &apos;N분의 1&apos;을 의미하는 한국어 표현으로, 비용을 균등하게
              나누는 것을 뜻합니다.
            </p>
            <p className="mt-3 leading-relaxed">
              회식이나 여행에서 여러 번의 비용이 발생하고, 매번 다른 사람이 결제하게 되면
              누가 누구에게 얼마를 보내야 하는지 계산하기가 매우 복잡해집니다. 엔빵 계산기는
              이러한 복잡한 계산을 자동으로 처리하여 최소한의 송금 횟수로 모든 정산을 완료할 수
              있도록 도와드립니다.
            </p>
          </section>

          {/* 주요 기능 */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">주요 기능</h2>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">다중 라운드 정산</h3>
                <p className="text-gray-700">
                  1차, 2차, 3차 등 여러 차수의 비용을 한 번에 관리할 수 있습니다.
                  각 라운드별로 참가자와 금액이 달라도 정확하게 계산됩니다.
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">참가자별 맞춤 정산</h3>
                <p className="text-gray-700">
                  각 비용 항목마다 실제 참가한 사람만 선택하여 정산할 수 있습니다.
                  중간에 합류하거나 먼저 떠난 사람도 정확하게 반영됩니다.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">최적화된 송금 계산</h3>
                <p className="text-gray-700">
                  복잡한 정산 내역을 분석하여 최소한의 송금 횟수로 모두가 정산을
                  완료할 수 있는 방법을 제시합니다. 누가 누구에게 얼마를 보내면 되는지
                  명확하게 알려드립니다.
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">간편한 공유</h3>
                <p className="text-gray-700">
                  정산 결과를 URL 링크로 손쉽게 공유할 수 있습니다. 카카오톡, 문자 등으로
                  링크만 보내면 상대방이 바로 정산 내역을 확인할 수 있습니다.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">개인정보 보호</h3>
                <p className="text-gray-700">
                  모든 데이터는 사용자의 기기에만 저장되며 서버로 전송되지 않습니다.
                  회원가입이나 로그인 없이 바로 사용할 수 있어 개인정보 걱정 없이
                  안심하고 이용하실 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* 사용 예시 */}
          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">이럴 때 사용하세요</h2>
            <ul className="space-y-2 list-disc list-inside text-gray-600">
              <li>회사 회식 후 정산이 필요할 때</li>
              <li>친구들과 여행 후 비용을 나눌 때</li>
              <li>동아리나 모임에서 공동 구매를 할 때</li>
              <li>룸메이트와 생활비를 정산할 때</li>
              <li>각자 다른 금액을 낸 경우 정확한 정산이 필요할 때</li>
            </ul>
          </section>

          {/* 개발사 소개 */}
          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">개발사 소개</h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">SidequestLab</h3>
              <p className="leading-relaxed text-gray-700">
                SidequestLab은 일상의 불편함을 해결하는 다양한 사이드 프로젝트를 개발하는
                창작 실험실입니다. 작지만 유용한 도구들을 만들어 더 편리한 일상을 만들어가고
                있습니다. 엔빵 계산기는 SidequestLab의 첫 번째 공개 프로젝트입니다.
              </p>
              <div className="mt-3">
                <a
                  href="https://sidequestlab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  sidequestlab.com 방문하기
                </a>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              지금 바로 정산하기
            </Link>
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
