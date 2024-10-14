'use client';

import { gameType } from '@/app.config';
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
import { Button } from '@/components/ui/button';
import { buttonClick } from '@/lib/sounds';
import { cn } from '@/lib/utils';
import { MessageCircle, PlayCircle, Users } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function GameSelectDialog({ children }: { children: ReactNode }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className='w-full' onClick={() => buttonClick.play()}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className='border-b'>
          <AlertDialogTitle>
            <div className='flex items-center'>
              <PlayCircle className='mr-2 size-6' />
              <span className={cn(DelaGothicOne.className, 'tracking-widest')}>
                ゲームモード選択
              </span>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <div className='space-y-4'>
          {gameType.map((type) => (
            <Button
              asChild
              className='w-full'
              key={type.id}
              onClick={() => buttonClick.play()}
              size='xl'
            >
              <Link href={`/play/${type.id}`}>
                {type.icon === 'users' && <Users className='mr-4 size-6' />}
                {type.icon === 'message-circle' && <MessageCircle className='mr-4 size-6' />}
                <span>{type.name}</span>
              </Link>
            </Button>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => buttonClick.play()}>閉じる</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
