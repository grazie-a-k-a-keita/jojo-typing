import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { ManagementStateProvider } from '@/providers/management-state';
import { ReactNode } from 'react';

export default function ManagementLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ManagementStateProvider>
      <Header type='management' />
      <main className='container'>{children}</main>
      <Footer />
    </ManagementStateProvider>
  );
}
