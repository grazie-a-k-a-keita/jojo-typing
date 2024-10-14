import { appConfig } from '@/app.config';
import { DelaGothicOne } from '@/components/font/fonts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import pJson from '@/package.json';
import Link from 'next/link';

export default function Header() {
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
          <Link href='/'>{appConfig.title}</Link>
        </Button>
        <p className='font-medium text-primary-foreground'>ver. {pJson.version}</p>
      </div>
    </header>
  );
}
