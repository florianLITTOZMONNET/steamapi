import axios from 'axios';
import {config} from '../../config/configEnv';
import {GetBadgesResponse} from '../contract/index';



export const GetBadgeOwned: (steamid: string)=> Promise<GetBadgesResponse>= async(steamid: string): Promise<GetBadgesResponse> => {

  const url = 'https://api.steampowered.com/IPlayerService/GetBadges/v1/'
  const params = {
    key: config.SteamApi,
    steamid,
    format: 'json'
  }
  const res = await axios.get<{response: GetBadgesResponse}>(url, {params})
  const data = res.data;
  return(data.response);
}