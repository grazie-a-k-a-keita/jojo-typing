import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import TouchOverlay from '@/components/common/touch-overlay';
import { ReactNode } from 'react';

export default function GameLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header type='game' />
      <main className='container'>{children}</main>
      <Footer />
      <TouchOverlay />
    </>
  );
}
