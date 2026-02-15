import type { Metadata } from 'next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from '@/components/common/Header';
import Providers from '@/providers/providers';
import '@/css/globals.css';
import { Toaster } from '@/components/ui/Sonner';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: {
    default: 'pickdap',
    template: 'pickdap | %s',
  },
  description: 'AI로 완성하는 면접 준비, 픽답',
  openGraph: {
    title: 'pickdap - AI로 완성하는 면접 준비',
    description: 'AI로 완성하는 면접 준비, 픽답',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />

          <main className="mx-auto my-8 w-full max-w-6xl">
            <ReactQueryDevtools />
            <Toaster />
            {children}
          </main>
          <Footer/>
        </Providers>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
