import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://next-i-oki.com";

const description =
  "沖縄を拠点に、清掃業・キッチンカー・経営コンサル・EC物販の4つの事業を展開。浄水技術による窓・外壁洗浄やエアコン洗浄など、清掃のすべてをワンストップで。3Kと呼ばれる仕事を、社会が誇れる仕事へ。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Next Innovation | 沖縄発・多角経営企業",
    template: "%s | Next Innovation",
  },
  description,
  keywords: [
    "Next Innovation",
    "沖縄",
    "清掃業",
    "エアコン洗浄",
    "外壁洗浄",
    "ハウスクリーニング",
    "キッチンカー",
    "経営コンサル",
    "EC物販",
    "沖縄 北部 清掃",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "Next Innovation",
    title: "Next Innovation | 沖縄発・多角経営企業",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Innovation | 沖縄発・多角経営企業",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
