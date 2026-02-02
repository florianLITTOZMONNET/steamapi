import {LibraryStats, GetBadgesResponse} from "../contract";
import {GetBadgeOwned} from "../service/getBadge";
import {GetLibrayUser} from "../service/getLibrary.service";

interface badgetoreturn{
  badgeid: number,
  level: number,
  communityitemid?: string,
  scarcity: number
}
interface badgesort {
  appid?: string,
  badgeid: number
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

export const rankbadge: (steamid: string)=> Promise<{[key: number]: badgesort}>= async(steamid: string): Promise<{[key: number]: badgesort}> => {
  const Badgelist: GetBadgesResponse = await GetBadgeOwned(steamid);
  const Library: LibraryStats = await GetLibrayUser(steamid);
  const sortedBadges = Badgelist.badges.sort((a, b) => a.scarcity - b.scarcity);
  let res: {[key: number]: badgesort} = {};
  for (const badge of sortedBadges) {
    res[badge.scarcity]= {
      appid: badge.appid?.toString(),
      badgeid: badge.badgeid,}
    if (badge.appid !== undefined){
      const gamename: string =assosiateidtogame(badge.appid, Library)
      res[badge.scarcity]= {
      appid: gamename,
      badgeid: badge.badgeid,}
    }
  }
  return res
}

const assosiateidtogame: (gameid: number, Library: LibraryStats) => string = (gameid: number, Library: LibraryStats): string => {
  let res: string = gameid.toString();
  for (const game of Library.games) {
    if (game.appid == gameid){
      res = game.name
    }
  }
  return res;
}