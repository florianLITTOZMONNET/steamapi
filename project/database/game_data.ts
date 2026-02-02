import Database from 'better-sqlite3';
import {Basedatabase} from './base_data';
import { Game } from '../contract/i-BDD';

export class GameBDD extends Basedatabase
{
  constructor(filename:string)
  {super(filename)}


   protected init():void
  {
    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS Games (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      )
    `).run();
  }

  AddGame(id: string, gamename: string):boolean
  {
    try{
      this.db.prepare("INSERT INTO Games (id,name) VALUES (?,?)").run(id,gamename);
      return true;
    }catch{return false;}
  }

  InsertManyGames(id:string[], games:string[]):number
  {
    const insert = this.db.prepare("INSERT INTO Games (id,name) VALUES (?;?)");
    const insterMany = this.db.transaction((ids: string[], name:string[]) => {
      let count = 0;
      for(let i=0; i<ids.length;i++) {
        count += insert.run(ids[i], name[i]).changes;
      }
      return count;
    });
    return insterMany(id,games);
  }

  getGameByName(name:string):Game|null
  {
    const result = this.db.prepare("SELECT * FROM Games WHERE name = ?").get(name) as Game |undefined;
    return result || null;
  }

  getGameById(id: string): Game | null {
    const result = this.db.prepare('SELECT * FROM Games WHERE id = ?').get(id) as Game | undefined;
    return result || null;
  }

  Deletegame(id:string): boolean
  {
    const res =this.db.prepare("DELETE FROM Games Where id = ?").run(id);
    return res.changes>0;
  }

  clear(): void {
    this.db.prepare("DELETE FROM Games").run();
  }


}