import {LibraryStats, GetBadgesResponse} from "../contract";
import {GetBadgeOwned} from "../service/getBadge";
import {GetLibrayUser} from "../service/getLibrary.service";

interface badgetoreturn{
  badgeid: number,
  level: number,
  communityitemid?: string,
  scarcity: number
}

export const AssosiatecompletedBadgetoGame: (steamid: string)=> Promise<{[key: string]: badgetoreturn}> = async(steamid: string): Promise<{[key: string]: badgetoreturn}> => {
  const Library: LibraryStats = await GetLibrayUser(steamid);
  const Badgelist: GetBadgesResponse = await GetBadgeOwned(steamid);
  let res: {[key: string]: badgetoreturn} = {};
  for (const badge of Badgelist.badges) {
    if(badge.appid === undefined){
      continue;
    }
    for (const game of Library.games) {
      if(game.appid === badge.appid){
        res[game.name] = {badgeid: badge.badgeid,
        level: badge.level,
        communityitemid: badge.communityitemid,
        scarcity: badge.scarcity,
        };
      }
    }
  }
  return res; 
}