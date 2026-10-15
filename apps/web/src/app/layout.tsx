import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GUILD — AI B2B 제품 탐색",
    template: "%s | GUILD",
  },
  description:
    "좋은 제품과 새로운 비즈니스 기회를 연결하는 AI 기반 B2B 제품 탐색 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
