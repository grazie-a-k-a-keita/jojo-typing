import Client from '@/app/(game)/result/[mode]/components/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '結果画面',
};

export default function Page({ params }: { params: { mode: string } }) {
  return (
    <>
      <Client mode={params.mode} />
    </>
  );
}
