import { GameCollection, GameMode } from './types/game-mode';

export const appConfig = {
  title: 'JOJOタイピング',
  description: '『ジョジョの奇妙な冒険』モチーフにした、タイピングゲーム',
};

export const gameType: { id: GameMode; name: string; icon: string; registerDb: GameCollection }[] =
  [
    { id: 'character', name: 'キャラ・スタンド', icon: 'users', registerDb: 'characterResult' },
    { id: 'dialogue', name: '名言', icon: 'message-circle', registerDb: 'dialogueResult' },
  ] as const;

export const GAME_TIME = 60;
