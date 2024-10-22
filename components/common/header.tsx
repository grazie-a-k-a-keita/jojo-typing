import { appConfig } from '@/app.config';
import { DelaGothicOne, NotoSansJP } from '@/components/font/fonts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import pJson from '@/package.json';
import Link from 'next/link';

export default function Header({ type }: { type: 'game' | 'management' }) {
  return (
    <header className='h-20 border-b bg-primary'>
      <div className='container flex h-full items-center justify-between'>
        <Button
          asChild
          className={cn(
            DelaGothicOne.className,
            'text-2xl font-extrabold text-primary-foreground tracking-widest'
          )}
          tabIndex={-1}
        >
          <Link href={type === 'management' ? '/management' : '/'}>
            {appConfig.title}
            <span className={cn(NotoSansJP.className, 'text-base ml-2')}>
              {type === 'management' && '管理画面'}
            </span>
          </Link>
        </Button>
        <Button asChild className='text-primary-foreground' variant='link'>
          <Link href='/'>ver. {pJson.version}</Link>
        </Button>
      </div>
    </header>
  );
}
