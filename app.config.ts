export const appConfig = {
  title: 'JOJOタイピング',
  description: '『ジョジョの奇妙な冒険』モチーフにした、タイピングゲーム',
};

export const gameType = [
  { id: 'character', name: 'キャラ・スタンド', icon: 'users' },
  { id: 'english', name: '名言', icon: 'message-circle' },
] as const;

export const GAME_TIME = 60;
