import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #3b82f6 100%)',
        }}
      >
        {/* 메인 카드 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '60px 80px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* 로고/아이콘 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              backgroundColor: '#3b82f6',
              borderRadius: '24px',
              marginBottom: '32px',
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>

          {/* 타이틀 */}
          <div
            style={{
              display: 'flex',
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            엔빵 계산기
          </div>

          {/* 서브타이틀 */}
          <div
            style={{
              display: 'flex',
              fontSize: '28px',
              color: '#64748b',
              marginBottom: '40px',
            }}
          >
            N-ppang Calculator
          </div>

          {/* 설명 */}
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              color: '#475569',
              textAlign: 'center',
              maxWidth: '600px',
              lineHeight: 1.5,
            }}
          >
            모임이나 회식 후 복잡한 정산을 간편하게!
          </div>
        </div>

        {/* 하단 브랜딩 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '40px',
            color: 'white',
            fontSize: '20px',
            opacity: 0.9,
          }}
        >
          nbbang.click | SidequestLab
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
