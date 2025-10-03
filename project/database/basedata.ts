import Database from "better-sqlite3";

export abstract class Basedatabase {
  protected db: Database.Database;
  protected file: string;

  constructor(filename: string = "Idsteam.db"){
    this.db = new Database(filename);
    this.file = filename;
    this.db.pragma('journal_mode = WAL')
    this.init();
  }

  protected abstract init(): void;

  close(): void
  {this.db.close();}

  backup(backupPath:string):void
  {
    this.db.backup(backupPath);
  }

  getFileName():string{return this.file;}

}