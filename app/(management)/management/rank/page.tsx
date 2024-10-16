import { getRankInfos } from '@/lib/firebase';
import Client from './components/client';

export default async function Page() {
  const rankInfo = await getRankInfos();

  if (!rankInfo) return null;

  return (
    <>
      <Client rankInfo={rankInfo} />
    </>
  );
}
