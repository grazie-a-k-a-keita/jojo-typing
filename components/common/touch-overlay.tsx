'use client';

import { useTouchState } from '@/providers/touch-state';

export default function TouchOverlay() {
  const { isTouch, setIsTouch } = useTouchState();

  const handleClick = () => {
    setIsTouch(true);
  };

  return !isTouch ? (
    <div
      className='fixed left-0 top-0 flex size-full items-center justify-center bg-black opacity-90'
      onClick={handleClick}
    >
      <p className='animate-[blink_1.5s_infinite] text-center text-2xl font-semibold text-primary-foreground'>
        画面をクリック（タッチ）して開始する
      </p>
    </div>
  ) : null;
}
