import { GetLibrayUser } from "../service/getLibrary.service";
import { SteamDatabaseManager } from "./database_manager";




export const getGameFromPlayers :()=>Promise<{[id: string]: string;}>=async():Promise<{[id: string]: string;}>=>{
    const games:{[id:string]:string}={};
    const steamDB = new SteamDatabaseManager('my_steam_data.db');
    const ids = steamDB.getAllPlayers();
    if(ids==null){
        console.log('no ids found');
        return games;
    }
    //console.log(`✓ Found ${ids.length} players in database:`);
    ids.forEach((id, index) => {
        console.log(`  ${index + 1}. ${id}`);
    });
    for(const id of ids) {
      const lib = await GetLibrayUser(id);
      if(lib && lib.games) {
          lib.games.forEach(game => {
              games[game.appid.toString()] = game.name;
              //console.log(games[game.appid.toString()]);
          });
      } else {
          console.log(`  ⚠ No games found for player ${id}`);
      }
    }
    steamDB.close();
    return games;
}


export const populateGameData:()=>Promise<{[id: string]: string;}>=async():Promise<{[id: string]: string;}>=>{
    const steamDB = new SteamDatabaseManager('my_steam_data.db');
    const games = await getGameFromPlayers();
    for(let game in games)
    {
        const added =steamDB.addGame(game, games[game]);
        if(!added)
        {console.log('couldn\'t add '+game+'  '+games[game]);}
        else{
            delete games[game];
        }

    }
    steamDB.close();
    return games
}