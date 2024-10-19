import { getRankInfos } from '@/lib/firebase';
import { Metadata } from 'next';
import Client from './components/client';

export const metadata: Metadata = {
  title: 'ランク管理画面',
};

export default async function Page() {
  const rankInfo = await getRankInfos();

  if (!rankInfo) return null;

  return (
    <>
      <Client rankInfos={rankInfo} />
    </>
  );
}
