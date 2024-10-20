'use client';

import { GAME_TIME } from '@/app.config';
import { getRankInfos } from '@/lib/firebase';
import { calculatePoint } from '@/lib/typing';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type ContextType = {
  correctTypeCount: number;
  setCorrectTypeCount: Dispatch<SetStateAction<number>>;
  missTypeCount: number;
  setMissTypeCount: Dispatch<SetStateAction<number>>;
  typeSpeed: number;
  score: { point: number; rank: string };
  reset: () => void;
};

const Context = createContext<ContextType>({} as ContextType);

export const ResultStateProvider = ({ children }: { children: ReactNode }) => {
  const [correctTypeCount, setCorrectTypeCount] = useState<number>(0);
  const [missTypeCount, setMissTypeCount] = useState<number>(0);
  const [typeSpeed, setTypeSpeed] = useState<number>(0);
  const [score, setScore] = useState<{ point: number; rank: string }>({ point: 0, rank: '-' });

  const reset = () => {
    setCorrectTypeCount(0);
    setMissTypeCount(0);
    setTypeSpeed(0);
    setScore({ point: 0, rank: '-' });
  };

  /**
   * スコアを計算する
   */
  useEffect(() => {
    if (correctTypeCount === 0 && missTypeCount === 0) return;

    setTypeSpeed(parseFloat((correctTypeCount / GAME_TIME).toFixed(3)));

    const point = calculatePoint({ correctTypeCount, missTypeCount });

    getRankInfos().then((rankInfos) => {
      const rank = rankInfos
        .sort((a, b) => b.minimumPoint - a.minimumPoint)
        .find((rankInfo) => point >= rankInfo.minimumPoint)?.rank;
      setScore({ point, rank: rank ?? '-' });
    });
  }, [correctTypeCount, missTypeCount]);

  return (
    <Context.Provider
      value={{
        correctTypeCount,
        setCorrectTypeCount,
        missTypeCount,
        setMissTypeCount,
        typeSpeed,
        score,
        reset,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useResultState = () => useContext(Context);
