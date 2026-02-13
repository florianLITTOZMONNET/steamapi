import axios from 'axios';
import {config} from '../../config/configEnv';


export async function resolveSteamVanityURL(vanity: string): Promise<string | null> {
    const url="https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/";
    const params={
        key: config.SteamApi,
        vanityurl: vanity
    }
    const res = await axios.get(url, {params});
    if (res.data.response.success === 1) {
        return res.data.response.steamid; 
    }
    return null;
}


