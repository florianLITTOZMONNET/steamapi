import Database from 'better-sqlite3';
import {Basedatabase} from './base_data';
import { Badge } from '../contract/i-BDD';

export class badgeBDD extends Basedatabase
{
    constructor(filename:string)
    {super(filename);}

    protected init():void 
    {
        this.db.prepare(`
            CREATE TABLE IF NOT EXISTS Badge (
                id TEXT PRIMARY KEY,
                foil INTEGER NOT NULL DEFAULT 0
            )
        `).run();
    }
    AddBadge(id:string, foil:boolean ):boolean
    {
        try{
            this.db.prepare("INSERT INTO Badge (id, foil) VALUES (?,?)").run(id,foil);
            return true
        }catch
        {return false;}
    }

    InsertManyBadge(id:string[], foil:boolean[]):number
    {
        const insert = this.db.prepare("INSERT INTO Badge (id,name) VALUES (?,?)");
        const insterMany = this.db.transaction((ids: string[], foil:boolean[]) => {
            let count = 0;
            for(let i=0; i<ids.length;i++) {
                count += insert.run(ids[i], foil[i]).changes;
            }
            return count;
        });
        return insterMany(id,foil);

    }

    getBadge(id: string): Badge | null {
        const result = this.db.prepare('SELECT * FROM Badge WHERE id = ?').get(id) as Badge | undefined;
        return result || null;
    }

    DeleteId(id:string)
    {
        const res = this.db.prepare("DELETE FROM Badge WHERE id= ? ").run(id);
        return res.changes>0;
    }

    clear(): void 
    {this.db.prepare("DELETE FROM PlayersIds").run();}

}