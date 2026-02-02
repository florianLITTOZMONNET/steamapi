import axios from 'axios';
import {config} from '../../config/configEnv';
import {GetPlayerSummariesResponse, SteamPlayer} from '../contract/index';

export const GetplayerBasicInfo: (steamid: string) => Promise<void> = async(steamid: string): Promise<void>  => {
  const {data} = await axios.get<GetPlayerSummariesResponse>(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.SteamApi}&steamids=${steamid}`);
  const players: SteamPlayer[] = data.response.players;
  for (const player of players) {
    console.log(player);
  }
}
