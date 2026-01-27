import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import KakaoScript from "@/components/KakaoScript";
import "./globals.css";

const GA_ID = "G-RN7CLNR7KZ";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "엔빵 계산기 | N-ppang Calculator",
  description: "모임이나 회식 후 복잡한 정산을 간편하게! 여러 차수에 걸친 비용을 개인별로 정확하게 계산하고, 최적화된 송금 방법을 제시합니다.",
  keywords: ["정산", "엔빵", "더치페이", "회식", "모임", "비용 분배", "정산 계산기"],
  authors: [{ name: "SidequestLab" }],
  verification: {
    other: {
      "naver-site-verification": "38ea8ad6fdc73f8b7eeaa6d1d04500d3dd2ba36b",
    },
  },
  openGraph: {
    title: "엔빵 계산기 | N-ppang Calculator",
    description: "모임이나 회식 후 복잡한 정산을 간편하게!",
    url: "https://nbbang.click",
    siteName: "엔빵 계산기",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "https://nbbang.click/api/og",
        width: 1200,
        height: 630,
        alt: "엔빵 계산기 - 모임 정산을 간편하게",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "엔빵 계산기 | N-ppang Calculator",
    description: "모임이나 회식 후 복잡한 정산을 간편하게!",
    images: ["https://nbbang.click/api/og"],
  },
  metadataBase: new URL("https://nbbang.click"),
};

// JSON-LD 구조화 데이터 (WebApplication)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "엔빵 계산기",
  "alternateName": "N-ppang Calculator",
  "description": "모임이나 회식 후 복잡한 정산을 간편하게! 여러 차수에 걸친 비용을 개인별로 정확하게 계산하고, 최적화된 송금 방법을 제시합니다.",
  "url": "https://nbbang.click",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "featureList": [
    "다중 라운드 정산",
    "참가자별 맞춤 정산",
    "최적화된 송금 계산",
    "간편한 공유",
    "개인정보 보호"
  ],
  "creator": {
    "@type": "Organization",
    "name": "SidequestLab",
    "url": "https://sidequestlab.com"
  },
  "inLanguage": "ko"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics gaId={GA_ID} />
        <KakaoScript />
      </body>
    </html>
  );
}
