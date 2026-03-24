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
        name TEXT NOT NULL UNIQUE,
        search BOOL DEFAULT 0,
        time DATE DEFAULT NULL
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

  searchedGame(id: string) {
    this.db.prepare("UPDATE Games SET search=1, time=DATE('now') WHERE id = ?").run(id);
  }

  getUnsearchedGame(): Game[] | null {
    const result = this.db.prepare('SELECT * FROM Games WHERE search=0').all() as Game[];
    return result.length ? result : null;
  }

  updateGameSearch() {
    this.db.prepare(`UPDATE Games SET search=0, time=NULL WHERE time <= DATE('now', '-4 months')`).run();
  }

  getAll():Game[]|null{
    const res = this.db.prepare('SELECT * FROM Games').all() as Game[]|undefined;
    return res||null;
  }

  Deletegame(id:string): boolean
  {
    const res =this.db.prepare("DELETE FROM Games Where id = ?").run(id);
    return res.changes>0;
  }

  clear(): void {
    this.db.prepare("DELETE FROM Games").run();
  }


  getRandomGame(): Game | null {
    const result = this.db.prepare('SELECT * FROM Games ORDER BY RANDOM() LIMIT 1').get() as Game | undefined;
    return result || null;
  }

  getRandomUnsearchedGame(): Game | null {
    const result = this.db.prepare('SELECT * FROM Games WHERE time IS NULL ORDER BY RANDOM() LIMIT 1').get() as Game | undefined;
    return result || null;
  }

}