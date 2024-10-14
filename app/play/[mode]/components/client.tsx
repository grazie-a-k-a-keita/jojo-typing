'use client';

import { GAME_TIME } from '@/app.config';
import { Button } from '@/components/ui/button';
import { bgm, keyboard, typeMiss } from '@/lib/sounds';
import { randomProblem, typingEn } from '@/lib/typing';
import { cn } from '@/lib/utils';
import { Undo2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type TypingText = { textJp: string; correct: string; problem: string };

const COUNT_DOWN = 3;

export default function Client() {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [countDown, setCountDown] = useState<number>(COUNT_DOWN);
  const [gameTimer, setGameTimer] = useState<number>(GAME_TIME);
  const [typingText, setTypingText] = useState<TypingText>({
    textJp: '',
    correct: '',
    problem: '',
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // すべての設定をリセットする
      setShow(false);
      setCountDown(COUNT_DOWN);
      setGameTimer(GAME_TIME);
      bgm.stop();
    } else {
      console.log(`key: ${event.key}, problem: ${typingText.problem}`);

      const result = typingEn({
        key: event.key,
        comparisonChar: typingText.problem.substring(0, 1),
      });

      if (result === 'ok') {
        keyboard.play();
        let correct = '';
        let problem = '';
        if (typingText.problem.substring(1, 2) === ' ') {
          correct = typingText.correct + typingText.problem.substring(0, 2);
          problem = typingText.problem.substring(2);
        } else {
          correct = typingText.correct + typingText.problem.substring(0, 1);
          problem = typingText.problem.substring(1);
        }
        setTypingText({
          textJp: typingText.textJp,
          correct: correct,
          problem: problem,
        });

        if (problem === '') {
          const initProblem = randomProblem({ type: 'Lowercase' });
          setTypingText({
            textJp: initProblem.textJp,
            correct: '',
            problem: initProblem.textEn,
          });
        }
      } else {
        typeMiss.play();
        console.log('miss');
      }
    }
  };

  useEffect(() => {
    if (gameTimer === 0) {
      // ゲーム終了
      router.push('/result');
    } else if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      if (!show) bgm.play();
      setShow(true);
      const timer = setTimeout(() => {
        setGameTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown, gameTimer]);

  useEffect(() => {
    if (countDown === 0) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingText, countDown]);

  useEffect(() => {
    const initProblem = randomProblem({ type: 'Lowercase' });
    setTypingText({
      textJp: initProblem.textJp,
      correct: '',
      problem: initProblem.textEn,
    });
  }, []);

  return (
    <div>
      {show ? (
        <div className='mx-auto max-w-4xl space-y-8 py-8'>
          <p>{gameTimer}</p>
          <div className='h-6 w-full overflow-hidden rounded-sm border'>
            <div
              className={cn(
                'size-full origin-left bg-green-500',
                gameTimer < GAME_TIME / 2 && 'bg-yellow-500',
                gameTimer < 10 && 'bg-red-500'
              )}
              style={{ transform: `scaleX(${gameTimer / GAME_TIME})` }}
            ></div>
          </div>
          <div className='select-none space-y-4 break-words rounded-md border px-8 py-16 shadow-xl'>
            <p className='text-center font-medium text-muted-foreground'>{typingText.textJp}</p>
            <p className='text-center text-2xl font-black tracking-wider'>
              <span className='text-muted-foreground/10 '>{typingText.correct}</span>
              <span className='text-primary'>{typingText.problem.substring(0, 1)}</span>
              <span className='text-primary/70'>{typingText.problem.substring(1)}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className='flex flex-col justify-center space-y-24 pt-16'>
          <p className='text-center text-6xl font-extrabold text-primary'>{countDown}</p>
          <div className='flex justify-center'>
            <Button asChild size='lg'>
              <Link href='/'>
                <Undo2 className='mr-2' />
                <span>トップページに戻る</span>
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
