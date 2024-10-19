import { Metadata } from 'next';
import Client from './components/client';

export const metadata: Metadata = {
  title: 'ホーム画面',
};

export default function Page() {
  return (
    <>
      <Client />
    </>
  );
}
