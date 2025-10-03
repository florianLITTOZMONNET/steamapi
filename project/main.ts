import {config} from '../config/configEnv';
import {rankbadge} from "./function/assosiationBadgeGame";
import {steamid} from '../steamid';

const temp = async() => {
  //const temp = await AssosiatecompletedBadgetoGame(config.SteamId);
  const badge = await rankbadge(steamid.auteiltoa);
  console.log(badge)
}

temp()

//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
//npx ts-node ./project/main.ts