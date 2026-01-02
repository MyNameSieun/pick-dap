import Providers from "@/providers";
import localFont from "next/font/local";
import "./globals.css";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
