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
        id TEXT PRIMARY KEY
      )
    `).run();
  }
  addId(id:string):boolean
  {
    try{
      this.db.prepare("INSERT INTO PlayersIds (id) VALUES (?)").run(id);
      return true;
    }catch{return false;}
  }

  addIds(ids: string[]): number {
    const insert = this.db.prepare("INSERT OR IGNORE INTO PlayersIds (id) VALUES (?)");
    const insertMany = this.db.transaction((ids: string[]) => {
      let count = 0;
      for(let i=0; i<ids.length;i++) {
        count += insert.run(ids[i]).changes;
      }
      return count;
    });
    return insertMany(ids);
  }

  getPlayer(id: string): Player | null {
    const result = this.db.prepare('SELECT * FROM PlayersIds WHERE id = ?').get(id) as Player | undefined;
    return result || null;
  }

  getAll():string[]|null{
    const rows = this.db.prepare('SELECT id FROM PlayersIds').all() as { id: string }[]
    const ids = rows.map(r => r.id);
    return ids;
  }

  deleteId(id: string): boolean {
    const result = this.db.prepare("DELETE FROM PlayersIds WHERE id = ?").run(id);
    return result.changes > 0;
  }

  clear(): void
  {this.db.prepare("DELETE FROM PlayersIds").run();}
}