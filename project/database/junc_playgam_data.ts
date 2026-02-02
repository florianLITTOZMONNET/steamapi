import Database from 'better-sqlite3';
import {Basedatabase} from './base_data';
import {GameBDD} from './game_data';
import {PlayersBDD} from './players_data';

export class Junc_P_G extends Basedatabase
{
    constructor(filename:string)
    {super(filename)}


  protected init():void
  {
    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS player_games (
        player_id TEXT NOT NULL,
        game_id TEXT NOT NULL,
        acquired_at INTEGER DEFAULT (unixepoch()),
        
        PRIMARY KEY (player_id, game_id),
        FOREIGN KEY (player_id) REFERENCES PlayersIds(id) ON DELETE CASCADE,
        FOREIGN KEY (game_id) REFERENCES Games(id) ON DELETE CASCADE
      )
    `).run();
  }

  addGameToPlayer(playerId:string, gameId:string): boolean
  {
    try{
      this.db.prepare("INSERT INTO player_games (player_id, game_id) VALUES (?,?)").run(playerId,gameId);
    return true;
    }catch{return false;} 
  }

  addMGameToPlayer(playerId:string, gameIds:string[]):number
  {
      const insert = this.db.prepare("INSERT OR IGNORE INTO player_games (player_id, game_id) VALUES (?, ?)");
      const insertMany = this.db.transaction((pId: string, gIds: string[]) => {
          let count = 0;
          for (const gameId of gIds) {
              count += insert.run(pId, gameId).changes;
          }
          return count;
      });
      return insertMany(playerId, gameIds);
  }
  GetPlayerGames(playerId: string): string[]
  {
    const results = this.db.prepare("SELECT game_id FROM player_games WHERE player_id = ?").all(playerId) as { game_id: string }[];
    return results.map(r => r.game_id);
  }

  getGamePlayers(gameId: string): string[]
  {
    const results = this.db.prepare("SELECT player_id FROM player_games WHERE game_id = ?").all(gameId) as { player_id: string }[];
    return results.map(r => r.player_id);
  }

  removeGameFromPlayer(playerId: string, gameId: string): boolean
  {
    const result = this.db.prepare("DELETE FROM player_games WHERE player_id = ? AND game_id = ?").run(playerId, gameId);
    return result.changes > 0;
  }

  clear(): void
  {
    this.db.prepare("DELETE FROM player_games").run();
  }

}