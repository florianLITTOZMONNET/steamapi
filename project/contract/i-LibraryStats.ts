import {gameOwnedStats} from './i-gameOwnedStats';

export interface LibraryStats {
  game_count: number;
  games: gameOwnedStats[];
}