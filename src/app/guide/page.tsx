import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "사용 가이드 | 엔빵 계산기",
  description: "엔빵 계산기 사용 방법을 단계별로 안내합니다. 참가자 추가, 비용 입력, 정산 확인, 결과 공유 방법을 확인하세요.",
  openGraph: {
    title: "사용 가이드 | 엔빵 계산기",
    description: "엔빵 계산기 사용 방법을 단계별로 안내합니다.",
    url: "https://nbbang.click/guide",
    siteName: "엔빵 계산기",
    locale: "ko_KR",
    type: "website",
  },
};

export default function GuidePage() {
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
        <h1 className="text-2xl font-bold mb-6">사용 가이드</h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          엔빵 계산기는 직관적인 캐러셀(슬라이드) 방식으로 구성되어 있습니다.
          좌우로 스와이프하거나 하단의 점을 터치하여 각 단계를 이동할 수 있습니다.
          아래의 단계별 가이드를 따라 손쉽게 정산을 완료해 보세요.
        </p>

        <div className="space-y-10">
          {/* Step 1: 참가자 추가 */}
          <section className="relative pl-8 border-l-4 border-blue-500">
            <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">참가자 추가하기</h2>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                첫 번째 화면에서는 정산에 참여할 사람들을 등록합니다. 이 단계에서 등록된
                참가자들이 이후 비용 분배의 대상이 됩니다.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">사용 방법</h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>입력창에 참가자 이름을 입력합니다 (예: 철수, 영희)</li>
                  <li>&quot;추가&quot; 버튼을 눌러 참가자를 등록합니다</li>
                  <li>필요한 만큼 참가자를 계속 추가합니다</li>
                  <li>잘못 입력한 경우 참가자 옆의 X 버튼으로 삭제할 수 있습니다</li>
                </ol>
              </div>
              <p className="text-sm text-gray-500">
                팁: 실명 대신 별명이나 간단한 호칭을 사용해도 됩니다.
                참가자는 나중에도 추가할 수 있습니다.
              </p>
            </div>
          </section>

          {/* Step 2: 비용 입력 */}
          <section className="relative pl-8 border-l-4 border-green-500">
            <div className="absolute -left-4 top-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">비용 입력하기</h2>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                두 번째 화면에서는 발생한 비용을 라운드별로 입력합니다. 1차, 2차 등
                여러 번의 모임이 있었다면 각각 별도의 라운드로 관리할 수 있습니다.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">비용 입력 순서</h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>&quot;라운드 추가&quot; 버튼을 눌러 새 라운드를 생성합니다 (예: 저녁식사)</li>
                  <li>결제한 사람(결제자)을 선택합니다</li>
                  <li>결제 금액을 입력합니다</li>
                  <li>해당 비용을 나눌 참가자들을 체크합니다</li>
                  <li>필요시 비용 설명을 입력합니다 (예: 삼겹살 4인분)</li>
                  <li>&quot;비용 추가&quot;를 눌러 저장합니다</li>
                </ol>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg mt-3">
                <h4 className="font-semibold text-yellow-800 mb-2">참가자 선택 팁</h4>
                <p className="text-gray-700">
                  비용을 나눌 때 모든 사람이 참여하지 않았다면, 실제로 해당 비용에
                  참여한 사람만 선택하세요. 예를 들어, 2차에서 3명만 참석했다면
                  그 3명만 체크하면 됩니다. 체크되지 않은 사람은 해당 비용에서
                  제외됩니다.
                </p>
              </div>
              <p className="text-sm text-gray-500">
                팁: 한 라운드 안에 여러 개의 비용을 추가할 수 있습니다.
                같은 장소에서 여러 사람이 번갈아 결제했다면 각각 추가하세요.
              </p>
            </div>
          </section>

          {/* Step 3: 정산 확인 */}
          <section className="relative pl-8 border-l-4 border-purple-500">
            <div className="absolute -left-4 top-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">정산 결과 확인하기</h2>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                세 번째 화면에서는 모든 비용 데이터를 바탕으로 계산된 정산 결과를
                확인할 수 있습니다. 누가 누구에게 얼마를 보내면 되는지 명확하게
                표시됩니다.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">정산 결과 읽는 방법</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li><strong>개인별 요약</strong>: 각 참가자가 낸 금액과 내야 할 금액 확인</li>
                  <li><strong>송금 안내</strong>: &quot;A → B: 10,000원&quot; 형식으로 표시됩니다</li>
                  <li>화살표 방향이 송금 방향입니다 (왼쪽 → 오른쪽으로 송금)</li>
                </ul>
              </div>
              <p className="text-sm text-gray-500">
                팁: 정산 결과는 최소한의 송금 횟수로 최적화되어 있습니다.
                예를 들어 A가 B에게, B가 C에게 각각 보내야 한다면
                A가 C에게 직접 보내는 것으로 단순화될 수 있습니다.
              </p>
            </div>
          </section>

          {/* Step 4: 공유 방법 */}
          <section className="relative pl-8 border-l-4 border-orange-500">
            <div className="absolute -left-4 top-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">결과 공유하기</h2>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                정산 결과를 다른 참가자들과 공유하여 모두가 정산 내역을 확인할 수
                있도록 해보세요. 공유받은 사람도 별도의 앱 설치 없이 바로 확인 가능합니다.
              </p>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">공유 방법</h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>상단의 &quot;공유&quot; 버튼을 터치합니다</li>
                  <li>모바일: 카카오톡, 문자 등 원하는 앱 선택</li>
                  <li>PC: 링크가 클립보드에 복사됩니다</li>
                  <li>공유받은 사람은 링크를 열면 동일한 정산 내역을 볼 수 있습니다</li>
                </ol>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <h4 className="font-semibold text-gray-800 mb-2">공유 시 알아두세요</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>공유 링크에는 모든 정산 데이터가 포함되어 있습니다</li>
                  <li>링크를 받은 사람도 내용을 수정할 수 있습니다</li>
                  <li>수정된 내용은 다시 공유해야 다른 사람에게 반영됩니다</li>
                </ul>
              </div>
              <p className="text-sm text-gray-500">
                팁: 정산이 완료된 후에도 기록용으로 링크를 저장해 두면
                나중에 다시 확인할 수 있습니다.
              </p>
            </div>
          </section>

          {/* 추가 팁 */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">추가 팁</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>초기화:</strong> 모든 데이터를 지우고 새로 시작하려면 상단의 &quot;초기화&quot; 버튼을 사용하세요.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>수정:</strong> 입력한 비용이나 참가자는 언제든 수정하거나 삭제할 수 있습니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>저장:</strong> 데이터는 브라우저에 자동 저장되므로 창을 닫아도 다음에 다시 열면 이어서 사용할 수 있습니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>개인정보:</strong> 모든 데이터는 사용자의 기기에만 저장되며 서버로 전송되지 않으니 안심하고 사용하세요.</span>
              </li>
            </ul>
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
