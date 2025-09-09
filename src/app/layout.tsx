import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/global/styles/globals.css';
import '@/common/styles/themes.css';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/common/contexts/ThemeContext';
import FloatingChat from '@/common/components/ui/floating-chat';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HTNS 화주 포탈',
  description: 'HTNS 화주 포탈 - 물류 서비스 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1 overflow-hidden">
              {children}
            </main>
            <FloatingChat />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 