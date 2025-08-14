import {config} from '../config/configEnv';
import { AssosiatecompletedBadgetoGame } from "./function/assosiationBadgeGame";


const temp = async(): Promise<void> => {
  const temp = await AssosiatecompletedBadgetoGame(config.SteamId);
  console.log(temp)
}

temp()
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
//npx ts-node ./service/test.ts