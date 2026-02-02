import axios from 'axios';
import {config} from '../../config/configEnv';
import {LibraryStats} from '../contract/index';

export const GetLibrayUser: (steamid: string) => Promise<LibraryStats> = async(steamid: string): Promise<LibraryStats> => {
  const res = await axios.get<{response: LibraryStats}>(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${config.SteamApi}&steamid=${steamid}&include_appinfo=true&format=json`)
  const data = res.data;
  return data.response
}