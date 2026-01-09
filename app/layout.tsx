import Providers from "@/providers/providers";
import localFont from "next/font/local";
import "@/css/globals.css";

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
      <body className={`${pretendard.variable} bg-bg-default`}>
        <Header />
        <main className="mx-auto my-11 w-285">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
