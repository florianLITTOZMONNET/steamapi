import {config} from '../config/configEnv';
import {rankbadge,AssosiatecompletedBadgetoGame} from "./function/assosiationBadgeGame";
import { GetBadgeOwned } from './service/getBadge';
import { SteamDatabaseManager } from './database/database_manager';
import { test } from './web_handler/ok';

const temp = async() => {
  /* test badge 
  //const temp = await AssosiatecompletedBadgetoGame(config.SteamId);
  const badge = await GetBadgeOwned("");
  console.log(badge)
  */

  /*
  const steamDB = new SteamDatabaseManager('my_steam_data.db');

  // Add a single player
  const success = steamDB.addPlayer('', 'dechu');
  if (success) {
      console.log('Player added successfully!');
  }
  const ok = steamDB.getPlayerBadges('');
  console.log(ok);
  */
  test('1203620');
  }

temp()

//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
//npx ts-node ./project/main.ts