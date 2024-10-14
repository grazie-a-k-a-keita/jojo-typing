import { appConfig } from '@/app.config';
import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import TouchOverlay from '@/components/common/touch-overlay';
import { NotoSansJP } from '@/components/font/fonts';
import { cn } from '@/lib/utils';
import { TouchStateProvider } from '@/providers/touch-state';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  description: '『ジョジョの奇妙な冒険』モチーフにした、タイピングゲーム',
  title: {
    template: `%s | ${appConfig.title}`,
    default: appConfig.title,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='ja'>
      <TouchStateProvider>
        <body className={cn(NotoSansJP.className, 'h-dvh')}>
          <Header />
          <main className='container'>{children}</main>
          <Footer />
          <TouchOverlay />
        </body>
      </TouchStateProvider>
    </html>
  );
}
