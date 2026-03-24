import axios from 'axios';
import {config} from '../../config/configEnv';


export async function resolveSteamVanityURL(vanity: string): Promise<string | null> {
    const url = "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/";
    const params = {
        key: config.SteamApi,
        vanityurl: vanity
    };

    try {
        const res = await axios.get(url, { params, timeout: 10000 });
        if (res.data.response.success === 1) {
            return res.data.response.steamid;
        }
        console.warn("Steam API returned non-success:", res.data.response);
        return null;
    } catch (err: any) {
        console.error("Steam API error:", err?.response?.status, err?.message);
        return null;
    }
}


