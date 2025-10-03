import Database from 'better-sqlite3';
import {Basedatabase} from './basedata';

export class IDdatabase extends Basedatabase
{
  constructor(filename:string)
  {super(filename)}

  protected init():void
  {
    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS Ids (
        Id TEXT PRIMARY KEY,
        added_at INTEGER DEFAULT (strftime('%s','now'))
      )
    `).run();
  }
  addId(id:string):boolean
  {
    try{
      this.db.prepare("INSERT INTO ids (id) VALUES (?)").run(id);
      return true;
    }catch{return false;}
  }


  addIds(ids: string[]): number {
    const insert = this.db.prepare("INSERT OR IGNORE INTO Ids (Id) VALUES (?)");
    const insertMany = this.db.transaction((ids: string[]) => {
      let count = 0;
      for (const id of ids) {
        count += insert.run(id).changes;
      }
      return count;
    });
    return insertMany(ids);
  }

  deleteId(id: string): boolean {
    const result = this.db.prepare("DELETE FROM Ids WHERE Id = ?").run(id);
    return result.changes > 0;
  }

  idExists(id: string): boolean {
    return this.db.prepare("SELECT 1 FROM Ids WHERE Id = ? LIMIT 1")
      .get(id) !== undefined;
  }

  listIds(): string[] {
    const rows = this.db.prepare("SELECT Id FROM Ids").all() as { Id: string }[];
    return rows.map(r => r.Id);
  }

  getCount(): number {
    const result = this.db.prepare("SELECT COUNT(*) as count FROM Ids")
      .get() as { count: number };
    return result.count;
  }

  clear(): void {
    this.db.prepare("DELETE FROM Ids").run();
  }
}