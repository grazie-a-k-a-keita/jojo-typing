'use client';

import { DelaGothicOne } from '@/components/font/fonts';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonClick } from '@/lib/sounds';
import { cn } from '@/lib/utils';
import { CircleHelp } from 'lucide-react';
import { ReactNode } from 'react';

export default function HowToDialog({ children }: { children: ReactNode }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className='w-full' onClick={() => buttonClick.play()}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className='border-b'>
          <AlertDialogTitle>
            <div className='flex items-center'>
              <CircleHelp className='mr-2 size-6' />
              <span className={cn(DelaGothicOne.className, 'tracking-widest')}>遊び方</span>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <div className='font-medium'>
          <p className='text-sm'>
            このサイトはアニメ『ジョジョの奇妙な冒険』モチーフにした、タイピングゲームです。
            <br />
            タイピングの練習に役立ててみてください!
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => buttonClick.play()}>閉じる</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
