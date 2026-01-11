import Providers from '@/providers/providers';
import localFont from 'next/font/local';
import '@/css/globals.css';

import Header from '@/components/common/Header';
import { Toaster } from 'sonner';

export const metadata = {
  title: {
    default: '픽답',
    template: '픽답 | %s',
  },
  description: '획기적인 AI 면접 서비스',
};

const pretendard = localFont({
  variable: '--font-pretendard',
  src: '../assets/fonts/PretendardVariable.woff2',
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
        <Toaster />

        <main className="mx-auto my-8 w-full max-w-6xl">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
