import Providers from "@/providers/providers";
import localFont from "next/font/local";
import "@/css/globals.css";
import "@/css/font.css";
import "@/css/color.css";
import "@/css/button.css";
import "@/css/shadow.css";
import Header from "@/components/common/header/Header";

const pretendard = localFont({
  variable: "--font-pretendard",
  src: "../assets/fonts/PretendardVariable.woff2",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable}`}>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
