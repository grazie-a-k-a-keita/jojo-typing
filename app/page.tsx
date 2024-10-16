'use client';

import { appConfig } from '@/app.config';
import GameSelectDialog from '@/components/dialog/game-select-dialog';
import HowToDialog from '@/components/dialog/how-to-dialog';
import SettingDialog from '@/components/dialog/setting-dialog';
import { DelaGothicOne } from '@/components/font/fonts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CircleHelp, Keyboard, Settings } from 'lucide-react';

export default function Home() {
  return (
    <div className={cn(DelaGothicOne.className, 'tracking-widest')}>
      <div className='py-16'>
        <p className='text-center text-7xl text-primary'>{appConfig.title}</p>
      </div>
      <div className='mx-auto mb-16 max-w-xl space-y-8 rounded-md border p-12 shadow-xl'>
        <GameSelectDialog>
          <Button className='w-full' size='xl'>
            <Keyboard className='mr-4 size-6' />
            <span>スタート</span>
          </Button>
        </GameSelectDialog>
        <HowToDialog>
          <Button className='w-full' size='xl' variant='outline'>
            <CircleHelp className='mr-4 size-6' />
            <span>遊び方</span>
          </Button>
        </HowToDialog>
        <SettingDialog>
          <Button className='w-full' size='xl' variant='outline'>
            <Settings className='mr-4 size-6' />
            <span>設定</span>
          </Button>
        </SettingDialog>
      </div>
    </div>
  );
}
