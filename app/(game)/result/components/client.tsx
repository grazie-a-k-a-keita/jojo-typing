'use client';

import { DelaGothicOne, NotoSansJP } from '@/components/font/fonts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useResultState } from '@/providers/result-state';
import Link from 'next/link';

export default function Client() {
  const { correctTypeCount, missTypeCount } = useResultState();
  return (
    <div className={cn(DelaGothicOne.className, 'tracking-widest')}>
      <div className='mx-auto mt-16 max-w-xl space-y-6 rounded-md border p-12 text-center shadow-2xl'>
        {[
          { key: 'ランキング', value: '100位', subText: ' / 1000人中' },
          { key: 'ランク', value: 'S+', subText: '' },
          { key: '正しく打ったキーの数', value: correctTypeCount, subText: ' 回' },
          { key: 'ミスタイプ数', value: missTypeCount, subText: ' 回' },
        ].map((item) => (
          <div className='space-y-1' key={item.key}>
            <p className='text-sm text-muted-foreground'>{item.key}</p>
            <p className='text-2xl'>
              {item.value}
              <span className='text-sm'>{item.subText}</span>
            </p>
          </div>
        ))}
        <div className={cn(NotoSansJP.className, 'grid grid-cols-3 gap-4 pt-8')}>
          <Button asChild size='lg' variant='secondary'>
            <Link href='/'>トップに戻る</Link>
          </Button>
          <Button size='lg' variant='secondary'>
            もう一度遊ぶ
          </Button>
          <Button size='lg'>記録を登録</Button>
        </div>
      </div>
    </div>
  );
}
