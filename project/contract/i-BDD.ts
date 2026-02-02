export interface Player {
  id: string;
  username: string;
}

export interface Game {
  id: number;
  name: string;
}

export interface Badge {
  id: number;
  name: string;
}

export interface PlayerWithDetails extends Player {
  games: Game[];
  badges: Badge[];
}
