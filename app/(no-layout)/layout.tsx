import type { Metadata } from 'next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Providers from '@/providers/providers';
import '@/css/globals.css';
import { Toaster } from '@/components/ui/Sonner';

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
          <main>
            <ReactQueryDevtools />
            <Toaster />
            {children}
          </main>
        </Providers>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
