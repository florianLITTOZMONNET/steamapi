import Database from 'better-sqlite3';
import {Basedatabase} from './base_data';
import { Player } from '../contract/i-BDD';

export class PlayersBDD extends Basedatabase
{
  constructor(filename:string)
  {super(filename)}

  protected init():void
  {
    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS PlayersIds (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL
      )
    `).run();
  }
  addId(id:string, name:string):boolean
  {
    try{
      this.db.prepare("INSERT INTO PlayersIds (id,username) VALUES (?,?)").run(id,name);
      return true;
    }catch{return false;}
  }

  addIds(ids: string[], names:string[]): number {
    const insert = this.db.prepare("INSERT OR IGNORE INTO PlayersIds (id, username) VALUES (?,?)");
    const insertMany = this.db.transaction((ids: string[], name:string[]) => {
      let count = 0;
      for(let i=0; i<ids.length;i++) {
        count += insert.run(ids[i], name[i]).changes;
      }
      return count;
    });
    return insertMany(ids,names);
  }

  getPlayer(id: string): Player | null {
    const result = this.db.prepare('SELECT * FROM PlayersIds WHERE id = ?').get(id) as Player | undefined;
    return result || null;
  }

  deleteId(id: string): boolean {
    const result = this.db.prepare("DELETE FROM PlayersIds WHERE id = ?").run(id);
    return result.changes > 0;
  }

  clear(): void
  {this.db.prepare("DELETE FROM PlayersIds").run();}
}