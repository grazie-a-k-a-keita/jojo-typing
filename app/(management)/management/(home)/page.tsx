import { Metadata } from 'next';
import Client from './components/client';

export const metadata: Metadata = {
  title: '管理画面',
};

export default async function Page() {
  return (
    <>
      <Client />
    </>
  );
}
