'use client';

import { DelaGothicOne, NotoSansJP } from '@/components/font/fonts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useResultState } from '@/providers/result-state';
import { RotateCw, Undo2 } from 'lucide-react';
import Link from 'next/link';
import ResultRegisterDialog from './result-register-dialog';

export default function Client({ mode }: { mode: string }) {
  const { correctTypeCount, missTypeCount, typeSpeed, score, reset } = useResultState();

  return (
    <div className={cn(DelaGothicOne.className, 'tracking-widest')}>
      <div className='mx-auto my-16 max-w-2xl space-y-6 rounded-md border p-12 text-center shadow-2xl'>
        {[
          { key: 'ランキング', value: '100位', subText: ' / 1000人中' },
          { key: 'ランク', value: score?.rank, subText: '' },
          { key: 'タイピング速度', value: typeSpeed, subText: ' 回 / 秒' },
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
        <div className={cn(NotoSansJP.className, 'grid grid-cols-1 gap-4 pt-8')}>
          <Button asChild onClick={reset} size='lg' variant='secondary'>
            <Link href='/'>
              <Undo2 className='mr-2 size-5' />
              トップに戻る
            </Link>
          </Button>
          <Button asChild onClick={reset} size='lg' variant='secondary'>
            <Link href={`/play/${mode}`}>
              <RotateCw className='mr-2 size-5' />
              もう一度遊ぶ
            </Link>
          </Button>
          <ResultRegisterDialog addFunction={() => {}} />
        </div>
      </div>
    </div>
  );
}
