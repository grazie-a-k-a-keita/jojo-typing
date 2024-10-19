'use client';

import ManagementLogin from '@/components/common/management-login';
import { Button } from '@/components/ui/button';
import { useManagementState } from '@/providers/management-state';
import { BookOpen, Crown, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Client() {
  const { auth, setAuth } = useManagementState();

  if (!auth) {
    return <ManagementLogin />;
  } else {
    return (
      <div className='mx-auto my-16 grid max-w-4xl grid-cols-2 gap-8'>
        <Button asChild size='xl'>
          <Link href='/management/rank' scroll={false}>
            <BookOpen className='mr-2' />
            ランク管理
          </Link>
        </Button>
        <Button asChild size='xl'>
          <Link href='/management/rank'>
            <Crown className='mr-2' />
            スコア管理
          </Link>
        </Button>
        <Button asChild size='xl'>
          <Link href='/management/rank'>
            <Crown className='mr-2' />
            スコア管理
          </Link>
        </Button>
        <Button onClick={() => setAuth(false)} size='xl' variant='outline'>
          <LogOut className='mr-2' />
          ログアウト
        </Button>
      </div>
    );
  }
}
